import React, { useState, useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './Transactions.css';

import { ReactComponent as BackIcon } from '../../images/back.svg';
import { ReactComponent as NextIcon } from '../../images/next.svg';

import { MenuContext } from '../../contexts/MenuContext';

import Expenses from '../Expenses/Expenses';

export default function Transactions() {
	const [subtract, setSubtract] = useState(0);

	const { setIsActive } = useContext(MenuContext);

	const startOfMonth = moment()
		.subtract(subtract, 'month')
		.startOf('month')
		.format('DD/MM/YYYY');
	const endOfMonth = moment()
		.subtract(subtract, 'month')
		.endOf('month')
		.format('DD/MM/YYYY');

	const getLastMonth = (e) => {
		setSubtract(subtract + 1);
	};

	const getNextMonth = (e) => {
		setSubtract(subtract - 1);
	};

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
							{`${startOfMonth} - ${endOfMonth}`}
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
							<span>{`+${(500000).toLocaleString()} đ`}</span>
						</div>
						<div className="outflow">
							<div>Dòng tiền ra</div>
							<span>{`-${(200000).toLocaleString()} đ`}</span>
						</div>
						<div className="result">
							<span>{`${(500000 - 200000).toLocaleString()} đ`}</span>
						</div>
						<Link to="/report" onClick={() => setIsActive('report')}>
							Xem báo cáo cụ thể
						</Link>
					</div>
				</div>
				<Expenses />
			</div>
		</div>
	);
}
