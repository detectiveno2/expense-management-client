import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from './routes/index';
import { Login, Register, Dashboard, MyWallet } from './pages/index';
import { Menu, Header } from './components/index';

import { UserProvider } from './contexts/UserContext';
import { WalletProvider } from './contexts/WalletContext';

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
			<WalletProvider>
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
									<PrivateRoute
										path="/my-wallet"
										component={() => <MyWallet />}
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
			</WalletProvider>
		</UserProvider>
	);
}

export default App;
