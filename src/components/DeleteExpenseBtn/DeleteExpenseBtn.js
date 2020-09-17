import React, { useState, useContext } from 'react';
import { Modal, Button } from 'antd';

import expenseApi from '../../api/expenseApi';
import { WalletContext } from '../../contexts/WalletContext';
import { ExpenseContext } from '../../contexts/ExpenseContext';

import './DeleteExpenseBtn.css';
import swal from 'sweetalert';

function DeleteExpenseBtn({ expenseId }) {
	const { setVirtualWallet, setCurrentWallet } = useContext(WalletContext);
	const { setIsShow } = useContext(ExpenseContext);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	const deleteExpense = async (expenseId) => {
		try {
			const { virtualWallet } = await expenseApi.deleteExpense(expenseId);
			setVirtualWallet(virtualWallet);
			setCurrentWallet(virtualWallet);
		} catch (error) {
			swal({
				icon: 'error',
				title: 'Opps!',
				text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
				button: 'Quay lại',
			});
			setLoading(false);
			setVisible(false);
		}
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = async () => {
		setLoading(true);
		await deleteExpense(expenseId);
		setIsShow(false);
		setLoading(false);
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal} className="d-e-btn">
				XÓA
			</Button>
			<Modal
				visible={visible}
				title="Xóa"
				onOk={handleOk}
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
						className="d-e-btn__submit-btn"
					>
						Xóa
					</Button>,
				]}
			>
				<p>Bạn có chắc muốn xóa giao dịch này?</p>
			</Modal>
		</>
	);
}

export default DeleteExpenseBtn;
