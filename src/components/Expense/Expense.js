import React from 'react';

import './Expense.css';

import { ReactComponent as InflowIcon } from '../../images/inflow.svg';
import { ReactComponent as OutflowIcon } from '../../images/outflow.svg';

export default function Expense({ expense, title, isIncome }) {
	return (
		<div className="Expense">
			<div className="expense-icon">
				{isIncome ? (
					<InflowIcon className="inflowIcon" />
				) : (
					<OutflowIcon className="outflowIcon" />
				)}
			</div>
			<div className="title">{title}</div>
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
