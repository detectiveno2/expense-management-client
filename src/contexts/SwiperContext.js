import React, { useState } from 'react';

export const SwiperContext = React.createContext();

export const SwiperProvider = ({ children }) => {
	const [monthActive, setMonthActive] = useState(new Date());

	return (
		<SwiperContext.Provider
			value={{
				monthActive,
				setMonthActive,
			}}
		>
			{children}
		</SwiperContext.Provider>
	);
};
