function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleCreateAccountClick = () => {
    if (validate(name, 'name') && validate(email, 'email') && validate(password, 'password')) {
      // Send a POST request to create a new account
      fetch('/account/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Account creation failed');
          }
        })
        .then((newUser) => {
          ctx.setUsers([...ctx.users, newUser]);
          ctx.setUser(newUser);
          setShow(false);
        })
        .catch((error) => {
          setStatus('Error: Account creation failed');
          setTimeout(() => setStatus(''), 3000);
          return;
        });
    }
  };

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (
        <CreateForm
          setShow={setShow}
          onAccountCreate={handleCreateAccountClick}
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      ) : (
        <CreateMsg
          setShow={setShow}
          name={name}
          email={email}
        />
      )}
    />
  );

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "password" && field.length < 6) {
      setStatus("Error: " + label + " must be at least 6 characters");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}

function CreateForm(props) {
  const { name, email, password, setName, setEmail, setPassword, onAccountCreate } = props;

  const handleCreateAccount = () => {
    onAccountCreate();
  };

  return (
    <>
      Name<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      /><br />

      Email address<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      /><br />

      Password<br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      /><br />

      <button
        type="submit"
        className="btn btn-light"
        onClick={handleCreateAccount}
      >
        Create Account
      </button>
    </>
  );
}

function CreateMsg(props) {
  const { name, email } = props;

  return (
    <>
      <h5>Success</h5>
      <p>Your account has been created:</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Click here to login
      </button>
    </>
  );
}

  