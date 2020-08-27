import React, { useEffect, useState } from 'react';

import walletApi from '../api/walletApi';

export const WalletContext = React.createContext();

export const WalletProvider = (props) => {
	const [wallets, setWallets] = useState([]);

	useEffect(() => {
		const getWalletsUser = async () => {
			try {
				const gotWallets = await walletApi.get();
				console.log(gotWallets);
				setWallets(gotWallets);
			} catch (error) {
				console.log(error);
			}
		};

		getWalletsUser();
	}, []);

	return (
		<WalletContext.Provider
			value={{
				wallets,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};
