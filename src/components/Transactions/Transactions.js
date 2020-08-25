import React, { useState } from 'react';
import moment from 'moment';
import { Button } from 'antd';

import './Transactions.css';

import { ReactComponent as BackIcon } from '../../images/back.svg';
import { ReactComponent as NextIcon } from '../../images/next.svg';

export default function Transactions() {
	const [subtract, setSubtract] = useState(0);

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
			</div>
		</div>
	);
}
