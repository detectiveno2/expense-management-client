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

const calculateFlow = (currentWallets) => {
	let inflow = 0;
	let outflow = 0;

	currentWallets.forEach((wallet) => {
		wallet.transactions.forEach((transaction) => {
			transaction.expenses.forEach((expense) => {
				if (expense.isIncome) {
					inflow += expense.expense;
				}
				if (!expense.isIncome) {
					outflow += expense.expense;
				}
			});
		});
	});

	return [inflow, outflow];
};

export const WalletProvider = (props) => {
	const [wallets, setWallets] = useState(null);
	const [total, setTotal] = useState(0);
	const [currentWallets, setCurrentWallets] = useState(null);
	const [inflow, setInflow] = useState(0);
	const [outflow, setOutflow] = useState(0);

	useEffect(() => {
		const getWalletsUser = async () => {
			try {
				const gotWallets = await walletApi.get();

				setWallets(gotWallets);
				setCurrentWallets(gotWallets);
			} catch (error) {
				console.log(error);
			}
		};

		getWalletsUser();
	}, []);

	// Set total
	useEffect(() => {
		if (wallets) {
			const total = calculateTotal(wallets);
			setTotal(total);
		}
	}, [wallets]);

	// calculate inflow, outflow wallets
	useEffect(() => {
		if (!currentWallets) return;

		const [inflow, outflow] = calculateFlow(currentWallets);
		// console.log(inflow, outflow);
		setInflow(inflow);
		setOutflow(outflow);
	}, [currentWallets]);

	return (
		<WalletContext.Provider
			value={{
				wallets,
				total,
				currentWallets,
				inflow,
				outflow,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};
