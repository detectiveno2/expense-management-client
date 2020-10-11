import React, { useContext } from 'react';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';

import { WalletContext } from '../../contexts/WalletContext';

const { Option } = Select;

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

	return <DatePicker onChange={onChange} picker="month" />;
}
