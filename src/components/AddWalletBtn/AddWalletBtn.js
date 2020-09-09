import React, { useState, useContext } from 'react';
import { Modal, Button, Input } from 'antd';
import swal from 'sweetalert';

import { WalletContext } from '../../contexts/WalletContext';
import walletApi from '../../api/walletApi';

function AddWalletBtn({ className }) {
	const { updateWallet, setVirtualWallet } = useContext(WalletContext);

	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	const [accountBalance, setAccountBalance] = useState('0');
	const [walletName, setWalletName] = useState('');

	const addWallet = async (data) => {
		try {
			const { wallet, virtualWallet } = await walletApi.add(data);
			updateWallet(wallet);
			setVirtualWallet(virtualWallet);
			swal({
				text: 'Bạn đã tạo ví thành công.',
				title: 'Xong!',
				icon: 'success',
				button: 'Tiếp tục',
			});
			setLoading(false);
		} catch (error) {
			swal({
				text: 'Bạn đã tạo ví này rồi.',
				title: 'Opps!',
				icon: 'warning',
				button: 'Quay lại',
			});
			setLoading(false);
		}
	};

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		setLoading(true);

		if (!accountBalance || !walletName) {
			swal({
				text: 'Vui lòng điền đầy đủ các trường',
				title: 'Opps!',
				icon: 'warning',
				button: 'Quay lại',
			});
			setLoading(false);
			return;
		}

		const data = {
			accountBalance: parseInt(accountBalance),
			walletName,
		};

		addWallet(data);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleAccountBalance = (event) => {
		if (event.target.value === '') {
			setAccountBalance('');
			return;
		}

		const inputAccountBalance = event.target.validity.valid
			? event.target.value
			: accountBalance;

		setAccountBalance(inputAccountBalance);
	};

	const handleWalletName = (event) => {
		setWalletName(event.target.value);
	};

	return (
		<>
			<Button type="primary" onClick={showModal} className={className}>
				THÊM VÍ
			</Button>
			<Modal
				visible={visible}
				title="Thêm ví"
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
						Thêm
					</Button>,
				]}
			>
				<label htmlFor="walletName">Tên ví</label>
				<Input
					type="text"
					id="walletName"
					placeholder="Tên ví"
					maxLength="20"
					value={walletName}
					onChange={handleWalletName}
					autoComplete="off"
					required
				/>
				<label htmlFor="accountBalance">Số dư</label>
				<Input
					id="accountBalance"
					type="text"
					pattern="[0-9]*"
					placeholder="Số dư ban đầu"
					maxLength="23"
					value={accountBalance}
					onChange={handleAccountBalance}
					required
				/>
			</Modal>
		</>
	);
}

export default AddWalletBtn;
