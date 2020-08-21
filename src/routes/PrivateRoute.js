import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ({ component: Component, ...rest }) {
	const token = localStorage.getItem('authToken');
	const user = JSON.parse(localStorage.getItem('user'));
	if (!token || !user) {
		return <Redirect to="/login" />;
	}
	return <Route {...rest} render={(props) => <Component {...props} />}></Route>;
}
