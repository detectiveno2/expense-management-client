import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';

import { UserContext } from '../../contexts/UserContext';

import axiosClient from '../../api/axiosClient';
import userApi from '../../api/userApi';

import { ReactComponent as FacebookIcon } from '../../images/facebook.svg';
import './FacebookLogin.css';

export default function () {
	const { setToken, setCurrentUser } = useContext(UserContext);

	const responseFacebook = async (response) => {
		const userName = response.name;
		const userId = response.userID;

		const postLoginFacebook = async () => {
			try {
				const { token, localUser } = await userApi.loginWithFacebook({
					userName,
					userId,
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

		postLoginFacebook();
	};

	return (
		<FacebookLogin
			appId={process.env.REACT_APP_FACEBOOK_ID}
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
