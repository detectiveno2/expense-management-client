import React, { useContext } from 'react';
import classNames from 'classnames';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from './routes/index';
import {
	Login,
	Register,
	Dashboard,
	MyWallet,
	AboutUs,
	Report,
} from './pages/index';
import { Menu, Header, ChangePassword } from './components/index';

import { UserContext } from './contexts/UserContext';

import './App.css';
import 'antd/dist/antd.css';

function App() {
	const { token } = useContext(UserContext);
	return (
		<Router>
			<div className="wrapper">
				<div className="main wrap-content">
					<Menu />
					<Header />
					<div className={classNames({ pages: token })}>
						<Switch>
							<PrivateRoute exact path="/" component={() => <Dashboard />} />
							<PrivateRoute
								exact
								path="/about-us"
								component={() => <AboutUs />}
							/>
							<PrivateRoute path="/report" component={() => <Report />} />
							<PrivateRoute path="/my-wallet" component={() => <MyWallet />} />
							<PrivateRoute
								path="/account/password"
								component={() => <ChangePassword />}
							/>
							<PublicRoute exact path="/login" component={() => <Login />} />
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
	);
}

export default App;
