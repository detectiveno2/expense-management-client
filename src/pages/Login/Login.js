import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classNames from 'classnames';

import axiosClient from '../../api/axiosClient';
import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';

import LoadingButton from '../../components/LoadingButton/LoadingButton';

import userApi from '../../api/userApi';
import MoneyImg from '../../images/money.png';
import { ReactComponent as ErrorImg } from '../../images/error.svg';
import './Login.css';

export default function () {
	const [err, setErr] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const { token } = await userApi.login({ email, password });

			// Store token into local storage, set default header.
			const bearerToken = `Bearer ${token}`;
			localStorage.setItem('authToken', bearerToken);
			axiosClient.defaults.headers.common['Authorization'] = bearerToken;

			setIsLoading(false);
		} catch (err) {
			setErr(err.response.data);
			setIsLoading(false);
		}
	};

	const token = localStorage.getItem('authToken');
	if (token) {
		return <Redirect to="/" />;
	}

	return (
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
							<form autocomplete="off" onSubmit={onSubmit}>
								<div className="form-email">
									<input
										required
										id="email"
										type="email"
										onChange={(e) => {
											setEmail(e.target.value);
											setErr(null);
										}}
									/>
									<label for="email">Email</label>
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
									<label for="password">Password</label>
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
