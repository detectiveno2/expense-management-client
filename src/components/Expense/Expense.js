import React, { useContext } from 'react';

import './Expense.css';

import { ReactComponent as InflowIcon } from '../../images/inflow.svg';
import { ReactComponent as OutflowIcon } from '../../images/outflow.svg';
import { ExpenseContext } from '../../contexts/ExpenseContext';

export default function Expense({
	date,
	expense,
	title,
	isIncome,
	description,
}) {
	const {
		setDate,
		setExpense,
		setTitle,
		setIsIncome,
		setDescription,
		setIsShow,
	} = useContext(ExpenseContext);

	const handleClick = () => {
		setDate(date);
		setExpense(expense);
		setTitle(title);
		setIsIncome(isIncome);
		setDescription(description);
		setIsShow(true);
	};

	return (
		<div className="Expense" onClick={handleClick}>
			<div className="expense-icon">
				{isIncome ? (
					<InflowIcon className="inflowIcon" />
				) : (
					<OutflowIcon className="outflowIcon" />
				)}
			</div>
			<div className="expense-title">
				<div className="title">{title}</div>
				<div className="description">{description}</div>
			</div>
			{isIncome ? (
				<div className="inflow">
					<span>{`${expense.toLocaleString()} đ`}</span>
				</div>
			) : (
				<div className="outflow">
					<span>{`${expense.toLocaleString()} đ`}</span>
				</div>
			)}
		</div>
	);
}
