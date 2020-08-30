import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import authApi from '../api/authApi';

export default function ({ component: Component, ...rest }) {
	const [isAuth, setIsAuth] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await authApi.checkAuth();
				setIsAuth(true);
			} catch (err) {
				setIsAuth(false);
			}
		};

		checkAuth();
	}, []);

	return !isAuth ? (
		<Redirect to="/login" />
	) : (
		<Route {...rest} render={(props) => <Component {...props} />}></Route>
	);
}
