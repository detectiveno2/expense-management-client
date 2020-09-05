import React, { useEffect, useState, useContext } from 'react';

import { UserContext } from './UserContext';
import walletApi from '../api/walletApi';

export const WalletContext = React.createContext();

const calculateTotal = (wallets) => {
	const total = wallets.reduce(
		(currentTotal, wallet) => currentTotal + wallet.accountBalance,
		0
	);

	return total;
};

export const WalletProvider = (props) => {
	const { currentUser } = useContext(UserContext);

	const [isLoaded, setIsLoaded] = useState(false);
	const [wallets, setWallets] = useState(null);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const getWalletsUser = async () => {
			try {
				const gotWallets = await walletApi.get();

				setWallets(gotWallets);
				setTotal(total);
				setIsLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};

		getWalletsUser();
	}, [currentUser]);

	return (
		<WalletContext.Provider
			value={{
				wallets,
				total,
				isLoaded,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};
