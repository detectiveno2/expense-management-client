import React, { useContext } from 'react';
import ReactLoading from 'react-loading';

import { NoWallet } from '../../components/index';

import { WalletContext } from '../../contexts/WalletContext';

import './Dashboard.css';

import Transactions from '../../components/Transactions/Transactions';

import './Dashboard.css';

export default function () {
	const { wallets, currentWallets } = useContext(WalletContext);

	return (
		<div className="Dashboard">
			{!wallets || !currentWallets ? (
				<div className="dashboard__loading">
					<ReactLoading
						type="spin"
						color="#6de283"
						className="dashboard__loading-animation"
					/>
				</div>
			) : wallets.length > 0 ? (
				<Transactions />
			) : (
				<div className="dashboard__no-wallet">
					<NoWallet />
				</div>
			)}
		</div>
	);
}
