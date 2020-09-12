import React, { useState, useContext } from 'react';
import { Modal, Button, Input } from 'antd';
import swal from 'sweetalert';

import walletApi from '../../api/walletApi';
import { WalletContext } from '../../contexts/WalletContext';

function UpdateWalletBtn({ className, walletName, backToList }) {
	const { updateWallet } = useContext(WalletContext);

	const [newWalletName, setNewWalletName] = useState(walletName);

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	const handleChangeWaleltName = (event) => {
		setNewWalletName(event.target.value);
	};

	const showModal = () => {
		setVisible(true);
	};

	const updateWalletName = async (data) => {
		try {
			const { updatedWallet } = await walletApi.updateWalletName(data);
			updateWallet(updatedWallet);
			swal({
				icon: 'success',
				title: 'Xong!',
				text: 'Bạn đã đổi tên ví thành công.',
				button: 'Tiếp tục',
			});
			setVisible(false);
			setNewWalletName('');
			setLoading(false);
			backToList();
		} catch (error) {
			swal({
				icon: 'error',
				title: 'Opps!',
				text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
				button: 'Quay lại',
			});
			setNewWalletName('');
			setLoading(false);
		}
	};

	const handleOk = () => {
		setLoading(true);

		if (!newWalletName) {
			swal({
				text: 'Vui lòng điền đầy đủ các trường',
				title: 'Opps!',
				icon: 'warning',
				button: 'Quay lại',
			});
			setLoading(false);
			return;
		}

		if (newWalletName === walletName) {
			swal({
				text: 'Tên mới không được giống tên cũ.',
				title: 'Opps!',
				icon: 'warning',
				button: 'Quay lại',
			});
			setLoading(false);
			return;
		}

		updateWalletName({ walletName, newWalletName });
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal} className={className}>
				ĐỔI TÊN
			</Button>
			<Modal
				visible={visible}
				title="Đổi tên ví"
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
					>
						Đổi
					</Button>,
				]}
			>
				<label htmlFor="newWalletName">Tên mới:</label>
				<Input
					type="text"
					id="newWalletName"
					maxLength="20"
					value={newWalletName}
					onChange={handleChangeWaleltName}
					placeholder="Tên ví"
					autoComplete="off"
					required
				/>
			</Modal>
		</>
	);
}

export default UpdateWalletBtn;
