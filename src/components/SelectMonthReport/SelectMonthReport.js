import React, { useContext } from 'react';
import { Select } from 'antd';

import { WalletContext } from '../../contexts/WalletContext';

const { Option } = Select;

export default function () {
	const { wallets, isLoaded, getExpenseOfMonth } = useContext(WalletContext);

	let walletNames;
	if (wallets && wallets.length > 0) {
		walletNames = wallets.map((item) => item.walletName);
	}

	// onchange select wallet
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};

	return (
		<Select
			defaultValue={walletNames.length > 0 && walletNames[0]}
			className="mb-5 ml-2"
			showSearch
			style={{ width: 200 }}
			placeholder="Select a wallet"
			optionFilterProp="children"
			onChange={onChange}
			filterOption={(input, option) =>
				option.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		>
			{walletNames.map((item, index) => (
				<Option value={item} key={index}>
					{item}
				</Option>
			))}
		</Select>
	);
}
