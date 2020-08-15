import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";

import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <div className="main wrap-content">
          <Switch>
            <PublicRoute exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
