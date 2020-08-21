import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import './AddExpenseModal.css';

function AddExpenseModal() {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setLoading(true);

		setTimeout(() => {
			setVisible(false);
			setLoading(false);
		}, 1500);
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
				title="Basic Modal"
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
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</>
	);
}

export default AddExpenseModal;
