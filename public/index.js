const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <div>
      <NavBar />
      <UserContext.Provider
        value={{ user: "Lydia", email: "lydia@mit.edu" }}
      >
        <div className="main-content">
          <Route path="/" exact component={Home} />
          <Route path="/createAccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
          <Route path="/userContext/" component={UserContext} />
        </div>
      </UserContext.Provider>
    </div>
  </HashRouter>
);