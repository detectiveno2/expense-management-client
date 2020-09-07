import React, { useContext } from 'react';
import { Select } from 'antd';

import { WalletContext } from '../../contexts/WalletContext';

import LoadingPage from '../Loading/Loading';
import Report from '../../components/Chart/Chart';
const { Option } = Select;

export default function () {
	const { wallets, isLoaded } = useContext(WalletContext);

	if (!isLoaded) {
		return <LoadingPage />;
	}

	// get wallet name
	let walletNames;
	if (wallets && wallets.wallets.length > 0) {
		walletNames = wallets.wallets.map((item) => item.walletName);
	}

	// onchange select wallet
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};

	return (
		<div>
			<span className="mr-1">Chọn ví</span>
			<Select
				defaultValue={walletNames[0]}
				className="mb-5 ml-2"
				showSearch
				style={{ width: 200 }}
				placeholder="Select a wallet"
				optionFilterProp="children"
				onChange={onChange}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{walletNames.map((item, index) => (
					<Option value={item} key={index}>
						{item}
					</Option>
				))}
			</Select>
			<Report />
		</div>
	);
}
