import React from 'react';

import './Expense.css';

export default function Expense({ expenses }) {
	return (
		<div className="Expense">
			<div className="expense-icon">ICON</div>
			<div className="title">Books</div>
			<div className="outflow">
				<span>-200,000 đ</span>
			</div>
		</div>
	);
}
