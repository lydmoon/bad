function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(`/api/usercontext/${ctx.email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBalance(data.balance);
      })
      .catch((error) => {
        console.error('Error fetching balance:', error);
      });
  }, [ctx.email]);

  function DepositForm(props) {
    const [deposit, setDeposit] = React.useState('');
    const [disabled, setDisabled] = React.useState(true);

    function handleDeposit() {
      if (!validate(Number(deposit))) return;

      const newBalance = balance + Number(deposit);

      fetch('/api/usercontext/updateBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: ctx.email, newBalance }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
          setBalance(newBalance);
          props.setShow(false);
        })
        .catch((error) => {
          console.error('Error updating balance:', error);
        });
    }

    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        Deposit Amount
        <input
          type="input"
          className="form-control"
          id="deposit"
          placeholder="Deposit Amount"
          value={deposit}
          onChange={(e) => {
            setDeposit(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleDeposit}
          disabled={disabled}
        >
          Deposit
        </button>
      </>
    );
  }

  function DepositMessage(props) {
    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <h5>Your deposit was successful.</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => {
            props.setShow(true);
            props.setStatus('');
          }}
        >
          Make another deposit
        </button>
      </>
    );
  }

  function validate(deposit) {
    if (isNaN(deposit)) {
      setStatus('Error: did not enter a valid number');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    if (deposit < 1) {
      setStatus('Error: Lowest deposit amount is $1');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? (
        <DepositForm setShow={setShow} setStatus={setStatus} balance={balance} />
      ) : (
        <DepositMessage setShow={setShow} setStatus={setStatus} />
      )}
    />
  );
}
