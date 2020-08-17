import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';

import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';

import MoneyImg from '../../images/money.png';
import ENDPOINT from '../../ENDPOINT';

export default function () {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [err, setErr] = useState(null);

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${ENDPOINT}/api/auth/register`, {
				email,
				password,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => setErr(err.response.data));
	};

	return (
		<div className="login">
			<div className="container">
				<div className="login-header">
					<img src={MoneyImg} alt="" />
					<h3>Expense Management</h3>
				</div>
				<div className="login-body">
					<h3>Register</h3>
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
										onChange={(e) => setEmail(e.target.email)}
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
								<button className="mt-3">Register</button>
								<p className="login-form-suggest">
									Have an account? <Link to="/login">Login</Link>
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
