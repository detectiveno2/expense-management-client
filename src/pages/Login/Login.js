import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import axiosClient from '../../api/axiosClient';
import userApi from '../../api/userApi';

import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import LoadingButton from '../../components/LoadingButton/LoadingButton';

import { UserContext } from '../../contexts/UserContext';

import MoneyImg from '../../images/money.png';
import { ReactComponent as ErrorImg } from '../../images/error.svg';
import './Login.css';

export default function () {
	const { token, setToken, setCurrentUser } = useContext(UserContext);

	const [auth, setAuth] = useState(false);
	const [err, setErr] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (token) {
			setAuth(true);
			return;
		}

		setAuth(false);
	}, [token]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const { token, localUser } = await userApi.login({ email, password });

			// Store token into local storage, set default header.
			localStorage.setItem('authToken', token);
			const bearerToken = `Bearer ${token}`;
			localStorage.setItem('user', JSON.stringify(localUser));
			axiosClient.defaults.headers.common['Authorization'] = bearerToken;

			setCurrentUser(localUser);
			setToken(bearerToken);
			setIsLoading(false);
		} catch (err) {
			setErr(err.response.data);
			setIsLoading(false);
		}
	};

	return auth ? (
		<Redirect to={{ pathname: '/' }} />
	) : (
		<div className="login">
			<div className="container">
				<div className="login-header">
					<img src={MoneyImg} alt="" />
					<h3>Expense Management</h3>
				</div>
				<div className="login-body">
					<h3>Log In</h3>
					<div className="login-body-main">
						<div className="login-social">
							<p>Using social networking accounts</p>
							<FacebookLogin />
							<GoogleLogin />
						</div>
						<div className="login-form ">
							<p>Using Expense Management App account</p>
							<form autoComplete="off" onSubmit={onSubmit}>
								<div className="form-email">
									<input
										className={classNames({
											reduced: email.length > 0,
										})}
										required
										id="email"
										type="email"
										onChange={(e) => {
											setEmail(e.target.value);
											setErr(null);
										}}
									/>
									<label htmlFor="email">Email</label>
								</div>
								<div className="form-password">
									<input
										required
										id="password"
										type="password"
										onChange={(e) => {
											setPassword(e.target.value);
											setErr(null);
										}}
									/>
									<label htmlFor="password">Password</label>
								</div>
								<p className="forgot-password">
									<Link to="/forgot-password">Forgot Password</Link>
								</p>
								{err && (
									<p className="auth-err">
										<span>
											<ErrorImg />
										</span>
										{err}
									</p>
								)}

								<LoadingButton
									textBtn="Login"
									className={classNames({
										'form-btn': true,
										hide: isLoading,
									})}
									isLoading={isLoading}
									onClick={onSubmit}
								/>
								<p className="login-form-suggest">
									Don’t have an account? <Link to="/register">Register</Link>
								</p>
							</form>
							<div className="login-or d-md-none">
								<span>OR</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
