import React, { useEffect, useState } from 'react';

export const MenuContext = React.createContext();

export const MenuProvider = (props) => {
	const path = window.location.pathname.split('/')[1];
	const [isActive, setIsActive] = useState(null);
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (!path) {
			setIsActive('transactions');
			return;
		}

		setIsActive(path);
	}, [path]);

	return (
		<MenuContext.Provider
			value={{
				isActive,
				setIsActive,
				isShow,
				setIsShow,
			}}
		>
			{props.children}
		</MenuContext.Provider>
	);
};
