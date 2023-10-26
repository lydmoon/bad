import React, { useState } from 'react';

// Define the UserStatus component
const UserStatus = ({ user, onLogout }) => {
  return (
    <div>
      <p>Welcome, {user}!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

function App() {
  // State to manage user information and authentication status
  const [user, setUser] = useState(null);

  // Function to handle user logout
  const handleLogout = () => {
    // Implement the logic to log the user out, e.g., clear user data, tokens, or cookies
    setUser(null); // Clear the user data in the state
  };

  return (
    <div>
      {user ? (
        // If the user is logged in, display the UserStatus component
        <UserStatus user={user} onLogout={handleLogout} />
      ) : (
        // If the user is not logged in, display a login form or other content
        // Here, you can implement your login form or any content for non-logged-in users
        <p>Please log in to access your account.</p>
      )}
    </div>
  );
}

export default App;

