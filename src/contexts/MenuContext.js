import React, { useState } from 'react';

export const MenuContext = React.createContext();

export const MenuProvider = (props) => {
	const [isActive, setIsActive] = useState('transactions');

	return (
		<MenuContext.Provider
			value={{
				isActive,
				setIsActive,
			}}
		>
			{props.children}
		</MenuContext.Provider>
	);
};
