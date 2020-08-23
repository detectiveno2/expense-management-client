import React, { useState, useEffect } from 'react';

import axiosClient from '../api/axiosClient';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
	let user;
	try {
		user = JSON.parse(localStorage.getItem('user'));
	} catch (err) {
		localStorage.removeItem('authToken');
		localStorage.removeItem('user');

		// Set default header.
		axiosClient.defaults.headers.common['Authorization'] = '';
	}

	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(user);

	useEffect(() => {
		// Get token.
		const token = localStorage.getItem('authToken');
		setToken(token);
	}, [token]);

	return (
		<UserContext.Provider
			value={{
				token,
				setToken,
				currentUser,
				setCurrentUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};
