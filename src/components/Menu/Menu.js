import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './Menu.css';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';
import { ReactComponent as WalletIcon } from '../../images/wallet.svg';
import { ReactComponent as ReportIcon } from '../../images/report.svg';
import { ReactComponent as QuestionIcon } from '../../images/question.svg';
import { ReactComponent as AboutUsIcon } from '../../images/about-us.svg';
import { ReactComponent as UserIcon } from '../../images/user.svg';

import { UserContext } from '../../contexts/UserContext';

export default function Menu() {
	const token = localStorage.getItem('authToken');
	const user = JSON.parse(localStorage.getItem('user'));

	const [isActive, setIsActive] = useState('transactions');
	const [isShow, setIsShow] = useState(false);

	const { currentUser } = useContext(UserContext);

	//toggle active function
	const toggleActive = (e) => {
		setIsActive(e.target.id);
	};

	//collapse menu function
	const collapse = (e) => {
		setIsShow(!isShow);
	};

	// get className
	const transactionsItemClass = classNames('menu-item', {
		'menu-item-active': isActive === 'transactions',
	});
	const reportItemClass = classNames('menu-item', {
		'menu-item-active': isActive === 'report',
	});
	const usingItemClass = classNames('menu-item', {
		'menu-item-active': isActive === 'using',
	});
	const aboutItemClass = classNames('menu-item', {
		'menu-item-active': isActive === 'about',
	});
	const menuCollapseClass = classNames('menu-collapse', {
		'collapse-show': isShow,
	});
	const overlayClass = classNames('menu-wrapper-overlay', {
		'collapse-show': isShow,
	});

	//Check login
	if (!token || !user) {
		return <div></div>;
	}

	return (
		<div className="Menu">
			<div className={overlayClass} onClick={collapse} />
			<div className={menuCollapseClass}>
				<div className="account">
					<div className="avatar">
						<UserIcon />
					</div>
					<div className="info">
						<div className="user-name">{currentUser.userName}</div>
						<div className="user-email">
							{currentUser ? currentUser.email : 'Email chưa được cung cấp.'}
						</div>
					</div>
				</div>
			</div>
			<div className="menu-wrapper">
				<div className="menu-item" onClick={collapse}>
					<MenuIcon className="menu-icon" />
				</div>
				<Link
					to="/"
					id="transactions"
					className={transactionsItemClass}
					onClick={toggleActive}
				>
					<div className="pointer-events-none">
						<WalletIcon />
						<span>Sổ giao dịch</span>
					</div>
				</Link>
				<Link
					to="/report"
					id="report"
					className={reportItemClass}
					onClick={toggleActive}
				>
					<div className="pointer-events-none">
						<ReportIcon />
						<span>Báo cáo</span>
					</div>
				</Link>

				<hr />
				<Link
					to="/using"
					id="using"
					className={usingItemClass}
					onClick={toggleActive}
				>
					<div className="pointer-events-none">
						<QuestionIcon />
						<span>Cách dùng</span>
					</div>
				</Link>
				<Link
					to="/about-us"
					id="about"
					className={aboutItemClass}
					onClick={toggleActive}
				>
					<div className="pointer-events-none">
						<AboutUsIcon />
						<span>Chúng tôi</span>
					</div>
				</Link>
			</div>
		</div>
	);
}
