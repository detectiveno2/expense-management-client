import React, { useState } from 'react';
import { Input } from 'antd';
import swal from 'sweetalert';

import SyncLoader from 'react-spinners/SyncLoader';
import axiosClient from '../../api/axiosClient';
import authApi from '../../api/authApi';

import './ChangePassword.css';

const handleChange = (set) => (event) => {
	set(event.target.value);
};

const setNewToken = (token) => {
	localStorage.setItem('authToken', token);
	const bearerToken = `Bearer ${token}`;
	axiosClient.defaults.headers.common['Authorization'] = bearerToken;
};

function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [reNewPassword, setReNewPassword] = useState('');
	const [btnLoading, setBtnLoading] = useState(false);

	const changePasswordApi = async () => {
		const data = { currentPassword, newPassword };
		try {
			const { newToken } = await authApi.changePassword(data);

			setNewToken(newToken);

			swal({
				text: 'Đổi mật khẩu thành công',
				title: 'OK!',
				icon: 'success',
				button: 'Tiếp tục',
			});
			setCurrentPassword('');
			setNewPassword('');
			setReNewPassword('');
			setBtnLoading(false);
		} catch (error) {
			if (error.response.status === 400) {
				swal({
					text: 'Mật khẩu hiện tại không đúng',
					title: 'Opps!',
					icon: 'warning',
					button: 'Quay lại',
				});
				setCurrentPassword('');
				setNewPassword('');
				setReNewPassword('');
				setBtnLoading(false);
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!currentPassword || !newPassword || !reNewPassword) {
			swal({
				text: 'Vui lòng điền đầy đủ các trường này.',
				title: 'Opps!',
				icon: 'warning',
				button: 'Quay lại',
			});
			return;
		}

		// Validation in client side
		if (newPassword !== reNewPassword) {
			swal({
				text: 'Vui lòng nhập lại mật khẩu mới.',
				title: 'Opps!',
				icon: 'warning',
				button: 'Quay lại',
			});
			setCurrentPassword('');
			setNewPassword('');
			setReNewPassword('');
			return;
		}

		if (newPassword === currentPassword) {
			swal({
				text: 'Mật khẩu mới và mật khẩu cũ không được giống nhau.',
				title: 'Opps!',
				icon: 'warning',
				button: 'Quay lại',
			});
			setCurrentPassword('');
			setNewPassword('');
			setReNewPassword('');
			return;
		}

		setBtnLoading(true);
		setTimeout(changePasswordApi, 3000);
		// changePasswordApi();
	};

	return (
		<div className="change-password-wrapper">
			<div className="change-password">
				<form className="change-password__form" onSubmit={handleSubmit}>
					<label htmlFor="currentPassword" className="change-password__label">
						Mật khẩu hiện tại:
					</label>
					<Input
						id="currentPassword"
						className="change-password__input"
						type="password"
						value={currentPassword}
						onChange={handleChange(setCurrentPassword)}
					/>
					<label htmlFor="newPassword" className="change-password__label">
						Mật khẩu mới:
					</label>
					<Input
						id="newPassword"
						className="change-password__input"
						type="password"
						value={newPassword}
						onChange={handleChange(setNewPassword)}
					/>
					<label htmlFor="reNewPassword" className="change-password__label">
						Nhập lại mật khẩu mới:
					</label>
					<Input
						id="reNewPassword"
						className="change-password__input"
						type="password"
						value={reNewPassword}
						onChange={handleChange(setReNewPassword)}
					/>
					<button
						className="change-password__submit-btn"
						type="submit"
						disabled={btnLoading ? true : false}
					>
						{btnLoading ? (
							<SyncLoader color="#f4f4f4" size="10px" />
						) : (
							'Đổi mật khẩu'
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ChangePassword;
