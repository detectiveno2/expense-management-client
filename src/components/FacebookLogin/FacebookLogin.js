import React, { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';

import { ReactComponent as FacebookIcon } from '../../images/facebook.svg';

import './FacebookLogin.css';

export default function () {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userID, setUserID] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [picture, setPicture] = useState('');

	// const componentClicked = () => {
	// 	console.log('clicked');
	// };

	const responseFacebook = (response) => {
		console.log(response);
	};

	return (
		<FacebookLogin
			appId="747911565967671"
			autoLoad={true}
			fields="name,email,picture"
			// onClick={componentClicked}
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
