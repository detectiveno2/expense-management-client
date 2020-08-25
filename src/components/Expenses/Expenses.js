import React from 'react';

import './Expenses.css';

import Expense from '../Expense/Expense';

export default function Expenses({ date, expenses }) {
	return (
		<div className="Expenses">
			<div className="expenses-item">
				<hr />
				<div className="expenses-item-top">
					<div className="date-expense">
						<div className="date-left-bar">{25}</div>
						<div className="date-right-bar">
							<div className="day">Thứ ba</div>
							<div className="month-year">Tháng 8 năm 2020</div>
						</div>
					</div>
					<div className="total-expense">-100.000 đ</div>
				</div>
			</div>
			<Expense />
		</div>
	);
}
