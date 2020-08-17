import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
	return (
		<Router>
			<div className="wrapper">
				<div className="main wrap-content">
					<Switch>
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
	);
}

export default App;
