import React from 'react';

import './Expense.css';

import { ReactComponent as InflowIcon } from '../../images/inflow.svg';
import { ReactComponent as OutflowIcon } from '../../images/outflow.svg';

export default function Expense({ expense, title, isIncome, description }) {
	return (
		<div className="Expense">
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
