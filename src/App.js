import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';

import { UserProvider } from './contexts/UserContext';
import { MenuProvider } from './contexts/MenuContext';

import './App.css';
import 'antd/dist/antd.css';

function App() {
	// Define state.
	const [isShow, setIsShow] = useState(false);

	// Define function.
	const collapseMenu = () => {
		setIsShow(!isShow);
	};

	return (
		<UserProvider>
			<MenuProvider>
				<Router>
					<div className="wrapper">
						<div className="main wrap-content">
							<Menu collapseMenu={collapseMenu} isShow={isShow} />
							<div>
								<Header collapseMenu={collapseMenu} isShow={isShow} />
								<Switch>
									<PrivateRoute
										exact
										path="/"
										component={() => <Dashboard />}
									/>
									<PublicRoute
										exact
										path="/login"
										component={() => <Login />}
									/>
									<PublicRoute
										exact
										path="/register"
										component={() => <Register />}
									/>
								</Switch>
							</div>
						</div>
					</div>
				</Router>
			</MenuProvider>
		</UserProvider>
	);
}

export default App;
