import React, { useContext } from 'react';

import { NoWallet } from '../../components/index';

import { WalletContext } from '../../contexts/WalletContext';

import './Dashboard.css';

import Transactions from '../../components/Transactions/Transactions';

import './Dashboard.css';

export default function () {
	const { wallets } = useContext(WalletContext);

	return (
		<div className="Dashboard">
			{!wallets.length ? (
				<Transactions />
			) : (
				<div className="dashboard__no-wallet">
					<NoWallet />
				</div>
			)}
		</div>
	);
}
