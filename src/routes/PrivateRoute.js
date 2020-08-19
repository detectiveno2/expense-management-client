import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ({ component: Component, ...rest }) {
	const token = localStorage.getItem('authToken');
	if (!token) {
		return <Redirect to="/login" />;
	}
	return <Route {...rest} render={(props) => <Component {...props} />}></Route>;
}
