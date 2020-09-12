import React, { useState } from 'react';

export const ExpenseContext = React.createContext();

export const ExpenseProvider = (props) => {
	const [isShow, setIsShow] = useState(false);
	const [date, setDate] = useState('');
	const [expense, setExpense] = useState('');
	const [title, setTitle] = useState('');
	const [isIncome, setIsIncome] = useState(null);
	const [description, setDescription] = useState('');

	return (
		<ExpenseContext.Provider
			value={{
				date,
				setDate,
				expense,
				setExpense,
				title,
				setTitle,
				isIncome,
				setIsIncome,
				description,
				setDescription,
				isShow,
				setIsShow,
			}}
		>
			{props.children}
		</ExpenseContext.Provider>
	);
};
