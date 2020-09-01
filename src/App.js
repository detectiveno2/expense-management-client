import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from './routes/index';
import { Login, Register, Dashboard, MyWallet, AboutUs } from './pages/index';
import { Menu, Header } from './components/index';

import { UserProvider } from './contexts/UserContext';
import { WalletProvider } from './contexts/WalletContext';
import { MenuProvider } from './contexts/MenuContext';

import './App.css';
import 'antd/dist/antd.css';

function App() {
	return (
		<UserProvider>
			<WalletProvider>
				<MenuProvider>
					<Router>
						<div className="wrapper">
							<div className="main wrap-content">
								<Menu />
								<Header />
								<div className="pages">
									<Switch>
										<PrivateRoute
											exact
											path="/"
											component={() => <Dashboard />}
										/>
										<PrivateRoute
											exact
											path="/about-us"
											component={() => <AboutUs />}
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
				</MenuProvider>
			</WalletProvider>
		</UserProvider>
	);
}

export default App;
