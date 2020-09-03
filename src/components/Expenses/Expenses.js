import React from 'react';
import moment from 'moment';

import './Expenses.css';

import Expense from '../Expense/Expense';

moment.updateLocale('vi', {
	weekdays: [
		'Chủ nhật',
		'Thứ hai',
		'Thứ ba',
		'Thứ tư',
		'Thứ năm',
		'Thứ sáu',
		'Thứ bảy',
	],
	months: [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12',
	],
});

const getTotal = (expenses) => {
	let total = 0;
	expenses.forEach((expense) => {
		total += expense.expense;
	});

	return total;
};

export default function Expenses({ date, expenses }) {
	const total = getTotal(expenses);

	return (
		<div className="Expenses">
			<div className="expenses-item">
				<hr />
				<div className="expenses-item-top">
					<div className="date-expense">
						<div className="date-left-bar">{moment(date).format('DD')}</div>
						<div className="date-right-bar">
							<div className="day">{moment(date).format('dddd')}</div>
							<div className="month-year">{`${moment(date).format(
								'MMMM'
							)} năm ${moment(date).format('YYYY')}`}</div>
						</div>
					</div>
					<div className="total-expense">{`${total.toLocaleString()} đ`}</div>
				</div>
			</div>
			{expenses.map((expense) => {
				return (
					<Expense
						expense={expense.expense}
						title={expense.title}
						isIncome={expense.isIncome}
						key={expense._id}
					/>
				);
			})}
		</div>
	);
}
