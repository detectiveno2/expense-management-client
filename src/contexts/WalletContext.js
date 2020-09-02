import React, { useEffect, useState } from 'react';

import walletApi from '../api/walletApi';

export const WalletContext = React.createContext();

export const WalletProvider = (props) => {
	const [wallets, setWallets] = useState(null);
	const [currentWallet, setCurrentWallet] = useState(null);
	const [totalBalance, setTotalBalance] = useState(null);

	useEffect(() => {
		const getWalletsUser = async () => {
			try {
				var result = 0;
				const gotWallets = await walletApi.get();

				//get total Balance
				for (var wallet of gotWallets) {
					result += wallet.accountBalance;
				}

				setTotalBalance(result);
				setCurrentWallet(gotWallets[0]);
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
				totalBalance,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};
