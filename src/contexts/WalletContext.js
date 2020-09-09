import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';

import walletApi from '../api/walletApi';
import { UserContext } from './UserContext';

export const WalletContext = React.createContext();

const calculateFlow = (transactions) => {
	let inflow = 0;
	let outflow = 0;
	transactions.forEach((transaction) => {
		transaction.expenses.forEach((expense) => {
			if (expense.isIncome) {
				inflow += expense.expense;
			}
			if (!expense.isIncome) {
				outflow += expense.expense;
			}
		});
	});
	return { inflow, outflow };
};

export const WalletProvider = (props) => {
	const { token, currentUser } = useContext(UserContext);

	const [wallets, setWallets] = useState(null);
	const [currentWallet, setCurrentWallet] = useState(null);
	const [virtualWallet, setVirtualWallet] = useState(null);

	useEffect(() => {
		const getWalletsUser = async () => {
			try {
				const { wallets: gotWallets, virtualWallet } = await walletApi.get();
				setWallets(gotWallets);
				setCurrentWallet(virtualWallet);
				setVirtualWallet(virtualWallet);
			} catch (error) {
				console.log(error);
			}
		};

		getWalletsUser();
	}, [token, currentUser]);

	const updateWallet = (updatedWallet) => {
		const newWallets = [...wallets];
		const walletIndex = newWallets.findIndex(
			(wallet) => wallet.walletName === updatedWallet.walletName
		);

		if (walletIndex === -1) {
			newWallets.push(updatedWallet);
		} else {
			newWallets.splice(walletIndex, 1, updatedWallet);
		}

		setWallets(newWallets);
	};

	const getExpenseOfMonth = (date, currentWallet) => {
		let total = 0;
		const transactionsOfMonth = currentWallet.transactions.filter(
			(transaction) => {
				return (
					moment(transaction.date).format('MM/YYYY') ===
					moment(date).format('MM/YYYY')
				);
			}
		);

		const { inflow, outflow } = calculateFlow(transactionsOfMonth);
		total = inflow + outflow;

		return { total, inflow, outflow, transactionsOfMonth };
	};

	const onLogout = () => {
		setWallets(null);
		setCurrentWallet(null);
		setVirtualWallet(null);
	};

	return (
		<WalletContext.Provider
			value={{
				wallets,
				currentWallet,
				getExpenseOfMonth,
				updateWallet,
				setCurrentWallet,
				virtualWallet,
				setVirtualWallet,
				onLogout,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};
