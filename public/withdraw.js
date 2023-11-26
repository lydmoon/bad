function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);


  const [user, setUser] = React.useState({
    email: ctx.email,
    balance: 0, 
  });

  React.useEffect(() => {
    fetch(`/api/usercontext/${ctx.email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser((prevUser) => ({ ...prevUser, balance: data.balance })); 
      })
      .catch((error) => {
        console.error('Error fetching balance:', error);
      });
  }, [ctx.email]);

  const handleWithdraw = () => {
    if (!validate(Number(amount), user.balance)) {
      return;
    }
    const newBalance = user.balance - Number(amount);
    fetch('/api/usercontext/updateBalance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email, newBalance }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        setUser((prevUser) => ({ ...prevUser, balance: newBalance }));
        setAmount('');
        setStatus('Withdrawal successful');
      })
      .catch((error) => {
        console.error('Error updating balance:', error);
      });
  };

  function validate(withdraw, balance) {
    if (isNaN(withdraw)) {
      setStatus('Error: did not enter a valid number');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (withdraw > balance) {
      setStatus('Error: Insufficient funds');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (withdraw < 1) {
      setStatus('Error: Lowest withdrawal amount is $1');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            Amount<br />
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </>
        ) : (
          <WithdrawMsg setShow={setShow} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Withdraw again
      </button>
    </>
  );
}
