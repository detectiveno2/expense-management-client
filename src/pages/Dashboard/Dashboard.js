import React, { useContext } from 'react';

import { NoWallet } from '../../components/index';

import { WalletContext } from '../../contexts/WalletContext';

import './Dashboard.css';

export default function () {
	const { wallets } = useContext(WalletContext);

	return (
		<div className="dashboard">
			{wallets.length ? (
				<div></div>
			) : (
				<div className="dashboard__no-wallet">
					<NoWallet />
				</div>
			)}
		</div>
	);
}
