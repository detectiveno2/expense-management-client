import React from 'react';

import './Dashboard.css';

import Transactions from '../../components/Transactions/Transactions';

export default function () {
	return (
		<div className="Dashboard">
			<Transactions />
		</div>
	);
}
