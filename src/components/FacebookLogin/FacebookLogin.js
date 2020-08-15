import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

import { ReactComponent as FacebookIcon } from '../../images/facebook.svg';

import ENDPOINT from '../../ENDPOINT';
import './FacebookLogin.css';

export default function () {
	const [err, setErr] = useState(null);

	const responseFacebook = (response) => {
		axios
			.post(`${ENDPOINT}/api/auth/facebook`, {
				userName: response.name,
				userID: response.userID,
			})
			.then((res) => console.log(res))
			.catch((err) => setErr(err.response.data));
	};

	return (
		<FacebookLogin
			appId="747911565967671"
			autoLoad={true}
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
