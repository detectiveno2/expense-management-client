import React, { useState, useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './Transactions.css';

import { ReactComponent as BackIcon } from '../../images/back.svg';
import { ReactComponent as NextIcon } from '../../images/next.svg';

import { MenuContext } from '../../contexts/MenuContext';
import { WalletContext } from '../../contexts/WalletContext';

import Expenses from '../Expenses/Expenses';

export default function Transactions() {
	const [subtract, setSubtract] = useState(0);

	const { setIsActive } = useContext(MenuContext);
	const { currentWallets, total, inflow, outflow } = useContext(WalletContext);

	const startOfMonth = moment().subtract(subtract, 'month').startOf('month');
	const endOfMonth = moment().subtract(subtract, 'month').endOf('month');
	const getLastMonth = (e) => {
		setSubtract(subtract + 1);
	};

	const getNextMonth = (e) => {
		setSubtract(subtract - 1);
	};

	console.log(currentWallets);

	return (
		<div className="Transactions">
			<div className="transactions-wrapper">
				<div className="top-bar">
					<div className="top-bar-wrapper">
						<div className="top-bar-btn" onClick={getLastMonth}>
							<Button type="primary" shape="circle">
								<BackIcon />
							</Button>
						</div>
						<div className="date">
							{`${startOfMonth.format('DD/MM/YYYY')} - ${endOfMonth.format(
								'DD/MM/YYYY'
							)}`}
							{subtract === 0 && <span>(Tháng này)</span>}
						</div>
						<div className="top-bar-btn" onClick={getNextMonth}>
							<Button type="primary" shape="circle">
								<NextIcon />
							</Button>
						</div>
					</div>
				</div>
				<div className="total">
					<div className="total-wrapper">
						<div className="inflow">
							<div>Dòng tiền vào</div>
							<span>{`+${inflow.toLocaleString()} đ`}</span>
						</div>
						<div className="outflow">
							<div>Dòng tiền ra</div>
							<span>{`${outflow.toLocaleString()} đ`}</span>
						</div>
						<div className="result">
							<span>{`${total.toLocaleString()} đ`}</span>
						</div>
						<Link to="/report" onClick={() => setIsActive('report')}>
							Xem báo cáo cụ thể
						</Link>
					</div>
				</div>
				{currentWallets.forEach((wallet) => {
					console.log(wallet);
					wallet.transactions.forEach((transaction) => {
						transaction.expenses.map((expense) => (
							<Expenses
								date={transaction.date}
								expenses={transaction.expenses}
								key={transaction._id}
							/>
						));
					});
				})}
				{/* <Expenses /> */}
			</div>
		</div>
	);
}
