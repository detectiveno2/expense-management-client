import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import moment from 'moment';
import swal from 'sweetalert';

import ExpenseModal from '../ExpenseModal/ExpenseModal';
import './AddExpenseModal.css';

function AddExpenseModal() {
	const currentDate = moment();

	const [date, setDate] = useState(currentDate);
	const [wallet, setWallet] = useState(null);
	const [isIncome, setIsIncome] = useState(false);
	const [expense, setExpense] = useState('');
	const [description, setDescription] = useState('');

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	// Functions for UI.

	const handleOk = async () => {
		const strError = 'Bạn vui lòng điền đầy đủ ngày/số tiền giao dịch.';
		setLoading(true);

		// Validate on client side.
		if (!date || !expense) {
			swal({
				text: strError,
				title: 'Lỗi!',
				icon: 'warning',
			});
			setLoading(false);
		}
	};

	// Helper functions.
	const changeDateSelect = (date, dateString) => {
		console.log(date, dateString);
		setDate(date);
	};

	const changeWalletSelect = (wallet) => {
		console.log(`selected ${wallet}`);
		setWallet(wallet);
	};

	const changeTypeSelect = (type) => {
		const isIncome = type || false;
		console.log(isIncome);
		setIsIncome(isIncome);
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

	const handleChangeDescription = (event) => {
		const description = event.target.value;
		setDescription(description);
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				THÊM GIAO DỊCH
			</Button>
			<Modal
				title="Thêm giao dịch"
				visible={visible}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Hủy
					</Button>,
					<Button
						key="submit"
						type="primary"
						loading={loading}
						onClick={handleOk}
					>
						Thêm
					</Button>,
				]}
			>
				<ExpenseModal
					expense={expense}
					description={description}
					changeDateSelect={changeDateSelect}
					changeWalletSelect={changeWalletSelect}
					changeExpenseSelect={changeExpenseSelect}
					changeTypeSelect={changeTypeSelect}
					handleChangeDescription={handleChangeDescription}
				/>
			</Modal>
		</>
	);
}

export default AddExpenseModal;
