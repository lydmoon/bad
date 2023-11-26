function App() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const ctx = React.useContext(UserContext);

  // Function to handle user logout
  const handleLogout = () => {
      setUser(null); // Clear the user data in the state
  };

  const handleLogin = (user) => {
      setUser(user); // Set the user data in the state
  };

  return (
      <div>
          {user ? (
              // If the user is logged in, display user information and a logout button
              <div>
                  <p>Welcome, {user.name}!</p>
                  <button onClick={handleLogout}>Logout</button>
              </div>
          ) : (
              // If the user is not logged in, display a login form
              <Login onLogin={handleLogin} />
          )}
      </div>
  );
}
