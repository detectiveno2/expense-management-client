import React, { useContext } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';

import { WalletContext } from '../../contexts/WalletContext';

export default function () {
	const { wallets } = useContext(WalletContext);

	const history = useHistory();

	let walletNames;
	if (wallets && wallets.length > 0) {
		walletNames = wallets.map((item) => item.walletName);
	}

	// onchange select wallet
	const onChange = (date, dateString) => {
		history.push(`/report/${dateString}`);
	};

	return (
		<DatePicker defaultValue={moment()} onChange={onChange} picker="month" />
	);
}
