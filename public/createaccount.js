function CreateAccount() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const ctx = React.useContext(UserContext);
    
    return (
      <div className='CreateAccountPage'>
      <div id='user-info'><h1 className='user-info'></h1></div>
        <Card
          txtcolor="white"
          bgcolor="dark"
          header="Create Account"
          status={status}
          body={
            show ? (
              <CreateAccountForm setShow={setShow} />
            ) : (
              <CreateMessage setShow={setShow} />
            )
          }
        />
      </div>
    );
  
    function CreateAccountForm(props) {
      const [name, setName] = React.useState("");
      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");
      const [disabled, setDisabled] = React.useState(true);
      
  
      function handleCreate() {
        //console.log('handle create fired');
        
        // validate field requirements are met
        if (!validate(name, "name")) return;
        if (!validate(email, "email")) return;
        if (!validate(password, "password")) return;
        
        // OAuth with Google Firebase
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(
        email,
        password
        );
        promise.then(()=> {
          //create user in MongoDB
          const url = `/account/create/${name}/${email}/${password}`;
          (async () => {
            var res  = await fetch(url);
            var data = await res.json();    
            console.log(data);        
          })();
        })
        promise.catch((e) => console.log(e.message));
          props.setShow(false);
      }
  
      return (
        <>
          Name
          <br />
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
              setName(e.currentTarget.value);
              setDisabled(false);
            }}
          />
          <br />
          Email address
          <br />
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => {
              setEmail(e.currentTarget.value);
              setDisabled(false);
            }}
          />
          <br />
          Password
          <br />
          <input type="password" className="form-control" id="password" placeholder="Enter a new password" value={password} onChange={(e) => {
              setPassword(e.currentTarget.value);
              setDisabled(false);
            }}
          />
          <br />
          <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={disabled}>Create Account</button>
        </>
      );
    }
  
    function CreateMessage() {
      return (
        <>
          <h5 id="status">You created your account.</h5>
          <a href="#/login/">
            <button type="submit" className="btn btn-light" id="status-btn" >Click to Log In</button>
          </a>
        </>
      );
    }
  
    function validate(field, label) {
      if (!field) {
        setStatus("Error: " + label + " is required");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      if (label === "password" && field.length < 8) {
        setStatus("Error: " + label + " must be at least 8 characters");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
  }