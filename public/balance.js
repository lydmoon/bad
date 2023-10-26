function Balance() {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [balance, setBalance] = React.useState('')
  const[loaded, setLoaded] = React.useState(false);
  
  React.useEffect(() => {
    const navCreateAccount = document.getElementById('nav-create-account');
    const navLogin = document.getElementById('nav-login');
    const navDeposit = document.getElementById('nav-deposit');
    const navWithdraw = document.getElementById('nav-withdraw');
    const navBalance = document.getElementById('nav-balance');
    const navAllData = document.getElementById('nav-allData');
    const navLogout = document.getElementById('nav-logout');

    navCreateAccount.style.display = "none";
    navLogin.style.display = "none";
    navDeposit.style.display = "block";
    navWithdraw.style.display = "block";
    navBalance.style.display = "block";
    navAllData.style.display = "block";
    navLogout.style.display = "block";

    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        setBalance(data.balance)
        if(data?.message){
        console.log(data.message)
        }
        console.log('JSON:', JSON.stringify(data))
      } catch (err) {
        console.log('err:', text)
      }
    })
    setLoaded(true);
  },[loaded])

  return (
    <>
    {!loaded ? <div>{spinner}</div> : (
      <>
      <div className="hi-msg">User: {ctx.user}</div> : <div></div>
      <Card
        txtcolor="white"
        bgcolor="dark"
        header="Current Balance"
        body={
          <>
            <ul className="list-group list-group-flush make-center text-black bg-light">
              <li className="list-group-item make-center">${balance}</li>
            </ul>
          </>
        }
      />
      </>
    )}
    </>
  );
}
