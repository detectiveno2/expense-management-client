import React, { useState, useContext } from 'react';
import { Modal, Button, DatePicker, Space, Select, Input } from 'antd';
import moment from 'moment';
import swal from 'sweetalert';

import { WalletContext } from '../../contexts/WalletContext';
import { ExpenseContext } from '../../contexts/ExpenseContext';

import expenseApi from '../../api/expenseApi';

import './EditExpenseBtn.css';

function EditExpenseBtn() {
	const { Option } = Select;
	const {
		date: defaultDate,
		expenseId,
		expense: defaultExpense,
		title: defaultTitle,
		isIncome: defaultIsIncome,
		description: defaultDescription,
		setIsShow,
	} = useContext(ExpenseContext);

	const { updateWallet, setCurrentWallet, setVirtualWallet } = useContext(
		WalletContext
	);

	// Define state.
	const [date, setDate] = useState(defaultDate);
	const [isIncome, setIsIncome] = useState(defaultIsIncome);
	const [title, setTitle] = useState(defaultTitle);
	const [expense, setExpense] = useState(defaultExpense);
	const [description, setDescription] = useState(defaultDescription);

	// State for UI.
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const updateExpense = async () => {
		const data = {
			date,
			expenseId,
			isIncome,
			title: title.trim(),
			expense: parseInt(expense),
			description: description.trim(),
		};

		if (
			date === defaultDate &&
			expense === defaultExpense &&
			isIncome === defaultIsIncome &&
			title === defaultTitle &&
			description === defaultDescription
		) {
			swal({
				text: 'Expense không có sự thay đổi',
				title: 'Lỗi!',
				icon: 'warning',
			});
			setLoading(false);
			setIsShow(false);
			return;
		}
		try {
			const { newData, virtualWallet } = await expenseApi.updateExpense(data);
			updateWallet(newData);
			setVirtualWallet(virtualWallet);
			setCurrentWallet(virtualWallet);

			const successStr = 'Bạn đã sửa giao dịch thành công!';
			swal({
				text: successStr,
				title: 'Xong!',
				icon: 'success',
				button: 'Tiếp tục',
			});
			setLoading(false);
			setIsShow(false);
		} catch (error) {
			const errorStr = error.response.data;

			swal({
				text: errorStr,
				title: 'Lỗi!',
				icon: 'warning',
			});
			setLoading(false);
			setIsShow(false);
		}
	};

	// Functions for UI.
	const handleOk = async () => {
		const errorStr = 'Vui lòng điền đầy đủ số tiền (ngày, tên) giao dịch.';
		setLoading(true);

		// Validate on client side.
		if (!date || !expense || !title) {
			swal({
				text: errorStr,
				title: 'Lỗi!',
				icon: 'warning',
			});
			setLoading(false);
			return;
		}

		// Call API
		updateExpense();
	};

	// Helper functions.
	const changeDateSelect = (date, dateString) => {
		console.log(date, dateString);
		setDate(date);
	};

	const changeTypeSelect = (type) => {
		const isIncome = type || false;
		console.log(isIncome);
		setIsIncome(isIncome);
	};

	const handleChangeTitle = (event) => {
		const newTitle = event.target.value;
		setTitle(newTitle);
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
		const newDescription = event.target.value;
		setDescription(newDescription);
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
		setTitle('');
		setDescription('');
		setExpense('');
		setLoading(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal} className="e-e-btn">
				SỬA
			</Button>
			<Modal
				title="Sửa"
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
						className="e-e-btn__submit-btn "
					>
						Thêm
					</Button>,
				]}
			>
				<div className="ExpenseModal">
					<div className="FlexLayout">
						<Space direction="vertical">
							<DatePicker
								style={{ width: '100%' }}
								defaultValue={moment(date)}
								onChange={changeDateSelect}
								format="DD/MM/YYYY"
							/>
						</Space>
						<Select defaultValue={defaultIsIncome} onChange={changeTypeSelect}>
							<Option value={false}>Khoản chi</Option>
							<Option value={true}>Khoản thu</Option>
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
			</Modal>
		</>
	);
}

export default EditExpenseBtn;
