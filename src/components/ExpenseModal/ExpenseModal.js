import React, { useContext } from 'react';
import { DatePicker, Space, Select, Input } from 'antd';
import moment from 'moment';

import { WalletContext } from '../../contexts/WalletContext';

import './ExpenseModal.css';

function ExpenseModal(props) {
	// Get current date.
	const currentDate = moment();
	const { wallets } = useContext(WalletContext);

	const {
		expense,
		description,
		title,
		changeDateSelect,
		changeWalletSelect,
		changeTypeSelect,
		handleChangeTitle,
		changeExpenseSelect,
		handleChangeDescription,
	} = props;

	const { Option } = Select;

	return (
		<div className="ExpenseModal">
			<div className="FlexLayout">
				<Space direction="vertical">
					<DatePicker
						style={{ width: '100%' }}
						defaultValue={currentDate}
						onChange={changeDateSelect}
						format="DD/MM/YYYY"
					/>
				</Space>
				<Select
					defaultValue={wallets[0].walletName}
					onChange={changeWalletSelect}
				>
					{wallets.map((wallet) => (
						<Option key={wallet._id} value={wallet.walletName}>
							{wallet.walletName}
						</Option>
					))}
				</Select>
				<Select defaultValue="false" onChange={changeTypeSelect}>
					<Option value="false">Khoản chi</Option>
					<Option value="true">Khoản thu</Option>
				</Select>
			</div>
			<Input
				type="text"
				placeholder="Tên giao dịch"
				maxLength="24"
				value={title}
				onChange={handleChangeTitle}
				required
			/>
			<Input
				type="text"
				pattern="[0-9]*"
				placeholder="Số tiền"
				maxLength="23"
				value={expense}
				onChange={changeExpenseSelect}
				required
			/>
			<Input
				type="text"
				placeholder="Ghi chú"
				maxLength="51"
				value={description}
				onChange={handleChangeDescription}
			/>
		</div>
	);
}

export default ExpenseModal;
