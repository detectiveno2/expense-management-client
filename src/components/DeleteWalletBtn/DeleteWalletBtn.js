import React, { useState, useContext } from 'react';
import { Modal, Button } from 'antd';

import walletApi from '../../api/walletApi';
import { WalletContext } from '../../contexts/WalletContext';

import './DeleteWalletBtn.css';
import swal from 'sweetalert';

function DeleteWalletBtn({ className, walletId, backToList }) {
	const { setVirtualWallet, setWallets, setCurrentWallet } = useContext(
		WalletContext
	);

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	const deleteWallet = async (walletId) => {
		try {
			const { wallets, virtualWallet } = await walletApi.deleteWallet(walletId);
			setWallets(wallets);
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
		await deleteWallet(walletId);
		setLoading(false);
		setVisible(false);
		backToList();
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal} className={className}>
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
						className="d-wl-btn__submit-btn"
					>
						Xóa
					</Button>,
				]}
			>
				<p>Bạn có chắc muốn xóa ví này?</p>
			</Modal>
		</>
	);
}

export default DeleteWalletBtn;
