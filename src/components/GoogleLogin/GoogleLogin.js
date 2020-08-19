import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import axiosClient from '../../api/axiosClient';
import userApi from '../../api/userApi';

import './GoogleLogin.css';

export default function () {
	const responseGoogle = (response) => {
		const userName = response.profileObj.name;
		const userId = response.profileObj.googleId;
		const email = response.profileObj.email;

		const postLoginGoogle = async () => {
			try {
				const { token } = await userApi.loginWithGoogle({
					userName,
					userId,
					email,
				});

				// Store token into local storage, set default header.
				const bearerToken = `Bearer ${token}`;
				localStorage.setItem('authToken', bearerToken);
				axiosClient.defaults.headers.common['Authorization'] = bearerToken;
			} catch (error) {
				// Cu Hieu xu ly UI cua loi o day nka.
			}
		};

		postLoginGoogle();
	};

	return (
		<div className="google-login">
			<GoogleLogin
				clientId="54610773616-i75blnd0q8cdr6gdcq70o8gg510agl02.apps.googleusercontent.com"
				buttonText="Login with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
}
