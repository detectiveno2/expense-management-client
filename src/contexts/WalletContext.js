import React, { useEffect, useState } from 'react';

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
	const [wallets, setWallets] = useState(null);
	const [currentWallet, setCurrentWallet] = useState(null);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const getWalletsUser = async () => {
			try {
				const gotWallets = await walletApi.get();
				const total = calculateTotal(gotWallets);

				setWallets(gotWallets);
				setCurrentWallet(gotWallets[0]);
				setTotal(total);
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
				total,
				currentWallet,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};
