import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
	let user;
	try {
		user = JSON.parse(localStorage.getItem('user'));
	} catch (err) {
		localStorage.removeItem('user');
	}

	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(user);

	useEffect(() => {}, [token]);

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
