import React, { useState } from 'react';

export const MenuContext = React.createContext();

export const MenuProvider = (props) => {
	const [isActive, setIsActive] = useState('transactions');
	const [isShow, setIsShow] = useState(false);

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
