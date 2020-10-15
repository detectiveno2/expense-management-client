import React from 'react';
import { Link } from 'react-router-dom';

import './NoWallet.css';

function NoWallet() {
	return (
		<div className="no-wallet">
			<p className="no-wallet__title">
				Bạn chưa có ví nào, hãy tạo ít nhất cho mình một ví trước khi bắt đầu.
			</p>
			<Link to="/my-wallet" className="no-wallet__add-btn ">
				Tạo ví
			</Link>
		</div>
	);
}

export default NoWallet;
