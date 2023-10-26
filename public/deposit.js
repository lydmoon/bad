function Deposit() {
    const[balance, setBalance] = React.useState("");
    const[loaded, setLoaded] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const ctx = React.useContext(UserContext);
  
    React.useEffect(() => {
      
      fetch(`/account/findOne/${ctx.email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text)
          setBalance(data.balance)
          console.log('JSON:', data)
        } catch (err) {
          console.log('err:', text)
        }
      })
      setLoaded(true);
    },[loaded])
    
    return (
      <>
      <div className="hi-msg">User: {ctx.user}</div>
      <Card
        txtcolor="white"
        bgcolor="dark"
        header="Deposit"
        status={status}
        body={
          show ? (
            <DepositForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <DepositMessage setShow={setShow} setStatus={setStatus}/>
          )
        }/>
      </>
    );
  
    function DepositForm(props) {
      const [deposit, setDeposit] = React.useState("");
      const [disabled, setDisabled] = React.useState(true);
  
      function handleDeposit() {
        if (!validate(Number(deposit))) return;
  
        fetch(`/account/update/${ctx.email}/${deposit}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.amount));
            props.setShow(false);
            console.log('JSON:', data);
          } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
          }
        });
        setBalance(balance + Number(deposit));
        setShow(false);
      }
  
      return (
        <>
          <span className="balance-information">Account Balance ${balance}</span>
          <br />
          Deposit Amount
          <input type="input" className="form-control" id="deposit" placeholder="Deposit Amount" value={deposit} onChange={(e) => {
              setDeposit(e.currentTarget.value);
              setDisabled(false);
            }}
          />
          <br />
          <button type="submit" className="btn btn-light" onClick={handleDeposit} disabled={disabled}>Deposit</button>
        </>
      );
    }
  
    function DepositMessage(props) {
      return (
        <>
          <span className="balance-information">Account Balance ${balance}</span>
          <br />
          <h5>Your deposit was successful.</h5>
          <button type="submit" className="btn btn-light" onClick={() => {props.setShow(true); props.setStatus('');}}>Make another deposit</button>
        </>
      );
    }
  
    function validate(deposit) {
      if (isNaN(deposit)) {
        setStatus("Error: did not enter a valid number");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      if (deposit < 1) {
        setStatus("Error: Lowest deposit amount is $1");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
  }