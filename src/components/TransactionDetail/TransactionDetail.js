import React, { useContext } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import './TransactionDetail.css';
import { ReactComponent as InflowIcon } from '../../images/inflow.svg';
import { ReactComponent as OutflowIcon } from '../../images/outflow.svg';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ExpenseContext } from '../../contexts/ExpenseContext';

function TransactionDetail() {
	const {
		date,
		expense,
		title,
		isIncome,
		description,
		isShow,
		setIsShow,
	} = useContext(ExpenseContext);

	const handleClickCloseBtn = () => {
		setIsShow(false);
	};
	console.log({ date, expense, title, isIncome, description, isShow });
	return (
		<div className="transaction-detail">
			<div className="transaction-detail__header">
				<CloseIcon
					className="transaction-detail__back-btn"
					onClick={handleClickCloseBtn}
				/>
				<div className="transaction-detail__title">Chi tiết giao dịch</div>
				<button>XÓA</button>
				<button>SỬA</button>
			</div>
			<div className="transaction-detail-content">
				{isIncome ? (
					<InflowIcon className="transaction-detail-content__flow-icon transaction-detail-content__flow-icon--inflowIcon" />
				) : (
					<OutflowIcon className="transaction-detail-content__flow-icon transaction-detail-content__flow-icon--outflowIcon" />
				)}
				<div className="transaction-detail-content__wrapper">
					<div className="transaction-detail-content__text">
						<div className="transaction-detail-content__title">{title}</div>
						<div className="transaction-detail-content__description">
							{description}
						</div>
						<div className="transaction-detail-date">
							{`${moment(date).format('dddd')}, ${moment(date).format(
								'DD/MM/YYYY'
							)}`}
						</div>
					</div>
					{isIncome ? (
						<div className="transaction-detail-content__expense transaction-detail-content__expense--outflow">{`${expense.toLocaleString()} đ`}</div>
					) : (
						<div className="transaction-detail-content__expense transaction-detail-content__expense--inflow">{`${expense.toLocaleString()} đ`}</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default TransactionDetail;
