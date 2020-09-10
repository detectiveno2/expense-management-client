import React, { useState, useContext } from 'react';
import { Modal, Button, Input, Checkbox } from 'antd';
import swal from 'sweetalert';
import moment from 'moment';

import './ModifyBalanceBtn.css';

import walletApi from '../../api/walletApi';
import { WalletContext } from '../../contexts/WalletContext';

function ModifyBalanceBtn({
	className,
	walletName,
	accountBalance,
	setSelectedWallet,
	backToList,
}) {
	const { updateWallet, setVirtualWallet } = useContext(WalletContext);

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [expense, setExpense] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const addModifyBalanceApi = async () => {
		let calExpense;
		let isIncome = false;
		const parseIntExpense = parseInt(expense);

		if (accountBalance === parseIntExpense) {
			swal({
				text: 'Số dư điều chỉnh bằng với số dư hiện tại',
				title: 'Lỗi!',
				icon: 'warning',
			});

			setLoading(false);
			setExpense('');
			setIsChecked(false);
			return;
		}

		if (accountBalance > parseIntExpense) {
			calExpense = accountBalance - parseIntExpense;
		} else {
			calExpense = parseIntExpense - accountBalance;
			isIncome = true;
		}

		const data = {
			date: moment(),
			walletName,
			isIncome,
			title: 'Điều chỉnh số dư',
			expense: calExpense,
			isShowReport: isChecked,
		};

		try {
			const { newData, virtualWallet } = await walletApi.modifyBalance(data);
			updateWallet(newData);
			setSelectedWallet(newData);
			setVirtualWallet(virtualWallet);

			const successStr = 'Đã điều chỉnh số dư thành công';
			swal({
				text: successStr,
				title: 'Xong!',
				icon: 'success',
				button: 'Tiếp tục',
			});

			setExpense('');
			setIsChecked(false);
			setLoading(false);
			setVisible(false);
			backToList();
		} catch (error) {
			const errorStr = error.response.data;

			swal({
				text: errorStr,
				title: 'Lỗi!',
				icon: 'warning',
			});
			setLoading(false);
		}
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		const errorStr = 'Vui lòng nhập số tiền cần điều chỉnh';
		setLoading(true);

		if (!expense) {
			swal({
				text: errorStr,
				title: 'Lỗi!',
				icon: 'warning',
			});

			setLoading(false);
			return;
		}

		addModifyBalanceApi();
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const changeExpenseSelect = (event) => {
		if (event.target.value === '') {
			setExpense('');
			return;
		}

		const inputExpense = event.target.validity.valid
			? event.target.value
			: expense;

		setExpense(inputExpense);
	};

	const handleCheck = (e) => {
		setIsChecked(e.target.checked);
	};

	return (
		<>
			<Button type="primary" onClick={showModal} className={className}>
				ĐIỀU CHỈNH SỐ DƯ
			</Button>
			<Modal
				visible={visible}
				title="ĐIỀU CHỈNH SỐ DƯ"
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Hủy
					</Button>,
					<Button
						key="submit"
						type="primary"
						loading={loading}
						onClick={handleOk}
					>
						Thay đổi
					</Button>,
				]}
			>
				<Input
					className="mb-2"
					type="text"
					pattern="[0-9]*"
					placeholder="Số tiền"
					maxLength="23"
					value={expense}
					onChange={changeExpenseSelect}
					required
				/>
				<Checkbox
					className="modify-balance-btn_checkbox"
					onChange={handleCheck}
					checked={isChecked}
					defaultChecked={false}
				>
					Thêm vào báo cáo?
				</Checkbox>
			</Modal>
		</>
	);
}

export default ModifyBalanceBtn;
