import React, { useState } from 'react';
import { Input } from 'antd';
import swal from 'sweetalert';

import authApi from '../../api/authApi';

import './ChangePassword.css';

const handleChange = (set) => (event) => {
	set(event.target.value);
};

function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [reNewPassword, setReNewPassword] = useState('');

	const changePasswordApi = async () => {
		const data = { currentPassword, newPassword };
		try {
			const responseData = await authApi.changePassword(data);
			console.log(responseData);
			swal({
				text: 'Đổi mật khẩu thành công',
				title: 'OK!',
				icon: 'success',
				button: 'Tiếp tục',
			});
			setCurrentPassword('');
			setNewPassword('');
			setReNewPassword('');
		} catch (error) {
			console.log(error.response);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

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

		changePasswordApi();
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
					<button className="change-password__submit-btn" type="submit">
						Đổi mật khẩu
					</button>
				</form>
			</div>
		</div>
	);
}

export default ChangePassword;
