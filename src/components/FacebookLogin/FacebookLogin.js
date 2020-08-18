import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

import axiosClient from '../../api/axiosClient';
import userApi from '../../api/userApi';

import { ReactComponent as FacebookIcon } from '../../images/facebook.svg';
import './FacebookLogin.css';

export default function () {
	const responseFacebook = async (response) => {
		const userName = response.name;
		const userId = response.userID;

		const postLoginFacebook = async () => {
			try {
				const { token } = await userApi.loginWithFacebook({
					userName,
					userId,
				});

				// Store token into local storage, set default header.
				const bearerToken = `Bearer ${token}`;
				localStorage.setItem('authToken', bearerToken);
				axiosClient.defaults.headers.common['Authorization'] = bearerToken;
			} catch (error) {
				// Cu Hieu xu ly UI cua loi o day nka.
			}
		};

		postLoginFacebook();
	};

	return (
		<FacebookLogin
			appId="747911565967671"
			autoLoad={false}
			fields="name,email,picture"
			callback={responseFacebook}
			textButton={
				<span>
					<FacebookIcon />
					Login with Facebook
				</span>
			}
		/>
	);
}
