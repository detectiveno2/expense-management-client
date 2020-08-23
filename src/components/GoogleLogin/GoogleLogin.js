import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';

import { UserContext } from '../../contexts/UserContext';

import axiosClient from '../../api/axiosClient';
import userApi from '../../api/userApi';

import './GoogleLogin.css';

export default function () {
	const { setToken, setCurrentUser } = useContext(UserContext);

	const responseGoogle = (response) => {
		const userName = response.profileObj.name;
		const userId = response.profileObj.googleId;
		const email = response.profileObj.email;

		const postLoginGoogle = async () => {
			try {
				const { token, localUser } = await userApi.loginWithGoogle({
					userName,
					userId,
					email,
				});

				// Store token into local storage, set default header.
				localStorage.setItem('authToken', token);
				const bearerToken = `Bearer ${token}`;
				localStorage.setItem('user', JSON.stringify(localUser));
				axiosClient.defaults.headers.common['Authorization'] = bearerToken;

				setCurrentUser(localUser);
				setToken(bearerToken);
			} catch (error) {
				alert(error);
			}
		};

		postLoginGoogle();
	};

	return (
		<div className="google-login">
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_ID}
				buttonText="Login with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
}
