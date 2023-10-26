function AllData() {
    const [data, setData] = React.useState([]);
    const [view, setView] = React.useState(true);
    const[loaded, setLoaded] = React.useState(false);
    const [users, setUsers] = React.useState([])
  
    React.useEffect(() => {
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
      setLoaded(true);
  
      const navCreateAccount  = document.getElementById('nav-create-account');
      const navLogin          = document.getElementById('nav-login');
      const navDeposit        = document.getElementById('nav-deposit');
      const navWithdraw       = document.getElementById('nav-withdraw');
      const navBalance        = document.getElementById('nav-balance');
      const navAllData        = document.getElementById('nav-allData');
      const navLogout         = document.getElementById('nav-logout');
      
      navCreateAccount.style.display = "none";
      navLogin.style.display = "none";
      navDeposit.style.display = "block";
      navWithdraw.style.display = "block";
      navBalance.style.display = "block";
      navAllData.style.display = "block";
      navLogout.style.display = "block";
    }, [loaded]);

    
    return (
      <>
        <div className="allData-json">
          <h5>All Data:</h5>
          {JSON.stringify(data)}
        </div>
      </>
    )
  }
