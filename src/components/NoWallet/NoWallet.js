import React from 'react';

import './NoWallet.css';

function NoWallet() {
	return (
		<div className="no-wallet">
			<p className="no-wallet__title">
				Bạn chưa có ví nào, hãy tạo ít nhất cho mình một ví trước khi bắt đầu.
			</p>
			<button className="no-wallet__add-btn">Tạo ví</button>
		</div>
	);
}

export default NoWallet;
