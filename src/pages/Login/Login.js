import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';

import userApi from '../../api/userApi';

import MoneyImg from '../../images/money.png';
import './Login.css';

export default function () {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		userApi.login({ email, password });
	};

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
										onChange={(e) => setEmail(e.target.value)}
									/>
									<label for="email">Email</label>
								</div>
								<div className="form-password">
									<input
										required
										id="password"
										type="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
									<label for="password">Password</label>
								</div>
								<p className="forgot-password">
									<Link to="/forgot-password">Forgot Password</Link>
								</p>
								<button>Login</button>
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
