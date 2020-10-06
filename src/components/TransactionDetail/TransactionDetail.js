import React, { useContext } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import './TransactionDetail.css';
import { ReactComponent as InflowIcon } from '../../images/inflow.svg';
import { ReactComponent as OutflowIcon } from '../../images/outflow.svg';
import { ReactComponent as CloseIcon } from '../../images/close-icon.svg';
import { ExpenseContext } from '../../contexts/ExpenseContext';

import DeleteExpenseBtn from '../DeleteExpenseBtn/DeleteExpenseBtn';
import EditExpenseBtn from '../EditExpenseBtn/EditExpenseBtn';

function TransactionDetail() {
	const {
		date,
		expenseId,
		expense,
		title,
		isIncome,
		description,
		setIsShow,
		isShow,
	} = useContext(ExpenseContext);

	const handleClickCloseBtn = () => {
		setIsShow(false);
	};
	return (
		<div
			className={classNames({
				'transaction-detail': true,
				'display-lg': isShow,
			})}
		>
			<div className="transaction-detail__header">
				<CloseIcon
					className="transaction-detail__back-btn"
					onClick={handleClickCloseBtn}
				/>
				<div className="transaction-detail__title">Chi tiết giao dịch</div>
				<div className="transaction-detail__btn-wrapper transaction-detail__btn-wrapper--large d-lg-flex d-none">
					<DeleteExpenseBtn expenseId={expenseId} />
					<EditExpenseBtn expenseId={expenseId} />
				</div>
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
			<div className="transaction-detail__btn-wrapper transaction-detail__btn-wrapper--small float-right d-lg-none d-flex">
				<DeleteExpenseBtn expenseId={expenseId} />
				<EditExpenseBtn expenseId={expenseId} />
			</div>
		</div>
	);
}

export default TransactionDetail;
