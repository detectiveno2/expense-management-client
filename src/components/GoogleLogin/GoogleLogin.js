import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import userApi from '../../api/userApi';

import './GoogleLogin.css';

export default function () {
	const responseGoogle = (response) => {
		userApi.login({
			userId: response.profileObj.googleId,
			email: response.profileObj.email,
			userName: response.profileObj.name,
		});
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
