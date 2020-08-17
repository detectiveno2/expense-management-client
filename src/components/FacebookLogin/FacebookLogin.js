import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

import userApi from '../../api/userApi';

import { ReactComponent as FacebookIcon } from '../../images/facebook.svg';
import './FacebookLogin.css';

export default function () {
	const responseFacebook = (response) => {
		userApi.login({ userName: response.name, userID: response.userID });
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
