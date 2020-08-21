import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import authApi from '../api/authApi';
import { UserContext } from '../contexts/UserContext';

export default function ({ component: Component, ...rest }) {
	const [isAuth, setIsAuth] = useState(true);

	const { setToken } = useContext(UserContext);

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

	if (!isAuth) {
		setToken('');

		return <Redirect to="/login" />;
	}
	return <Route {...rest} render={(props) => <Component {...props} />}></Route>;
}
