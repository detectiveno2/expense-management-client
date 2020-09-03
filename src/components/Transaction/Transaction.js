import React from 'react';

import Expenses from '../Expenses/Expenses';

export default function Transaction({ transactions }) {
	return (
		<div>
			{transactions.map((transaction) => {
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
