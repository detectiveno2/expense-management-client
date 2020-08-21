import React, { useState } from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
	let user;
	try {
		user = JSON.parse(localStorage.getItem('user'));
	} catch (err) {
		if (err) {
			localStorage.removeItem('authToken');
			localStorage.removeItem('user');
		}
	}

	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(user);

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
