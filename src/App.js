import dotenv from 'dotenv';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

import { UserProvider } from './contexts/UserContext';

function App() {
	return (
		<UserProvider>
			<Router>
				<div className="wrapper">
					<div className="main wrap-content">
						<Switch>
							<PrivateRoute exact path="/" component={() => <Dashboard />} />
							<PublicRoute exact path="/login" component={() => <Login />} />
							<PublicRoute
								exact
								path="/register"
								component={() => <Register />}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</UserProvider>
	);
}

export default App;
