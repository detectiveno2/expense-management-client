import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import swal from 'sweetalert';

import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';

import LoadingButton from '../../components/LoadingButton/LoadingButton';

import userApi from '../../api/userApi';
import MoneyImg from '../../images/money.png';

export default function () {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [err, setErr] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [registered, setRegistered] = useState(false);

	const onSubmit = (e) => {
		setIsLoading(true);
		e.preventDefault();

		const getData = async () => {
			try {
				await userApi.register({ email, password });
				setIsLoading(false);
				setRegistered(true);

				//alert registered success
				swal('Success', 'Thank you!', 'success');
			} catch (err) {
				setErr(err);
				setIsLoading(false);
			}
		};
		getData();
	};

	if (registered) {
		return <Redirect to="/login" />;
	}

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
								<LoadingButton
									textBtn="Register"
									className={classNames({
										'form-btn': true,
										hide: isLoading,
									})}
									isLoading={isLoading}
								/>
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
