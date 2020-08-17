import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import './GoogleLogin.css';
import ENDPOINT from '../../ENDPOINT';

export default function () {
	const [err, setErr] = useState(null);

	const responseGoogle = (response) => {
		axios
			.post(`${ENDPOINT}/api/auth/google`, {
				userId: response.profileObj.googleId,
				email: response.profileObj.email,
				userName: response.profileObj.name,
			})
			.then((res) => console.log(res))
			.catch((err) => setErr(err.response.data));
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
