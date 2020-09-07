import React from 'react';
import moment from 'moment';

import Expenses from '../Expenses/Expenses';

export default function Transaction({ transactions }) {
	const sortTransactions = JSON.parse(JSON.stringify(transactions)).sort(
		(a, b) => moment(b.date) - moment(a.date)
	);

	return (
		<div>
			{sortTransactions.map((transaction) => {
				return (
					<Expenses
						date={transaction.date}
						expenses={transaction.expenses}
						key={transaction._id}
					/>
				);
			})}
		</div>
	);
}
