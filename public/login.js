function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [status, setStatus] = React.useState('');

    const ctx = React.useContext(UserContext);

    function handle() {
        const user = ctx.users.find((user) => user.email === email);

        if (!user) {
            setStatus('User not found. Please try again or create a new account.');
            return;
        }

        if (user.password === password) {
            setStatus('');
            onLogin(user); // Call the onLogin function with the user data
        } else {
            setStatus('Incorrect password.');
        }
    }

    return (
        <>
            <h5>Login</h5>
            <p>{status}</p>
            <input
                type="input"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button type="submit" className="btn btn-light" onClick={handle}>
                Login
            </button>
        </>
    );
}
