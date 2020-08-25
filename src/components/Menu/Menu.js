import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

import './Menu.css';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';
import { ReactComponent as WalletIcon } from '../../images/wallet.svg';
import { ReactComponent as ReportIcon } from '../../images/report.svg';
import { ReactComponent as QuestionIcon } from '../../images/question.svg';
import { ReactComponent as AboutUsIcon } from '../../images/about-us.svg';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import { ReactComponent as LogoutIcon } from '../../images/logout.svg';
import { ReactComponent as LockIcon } from '../../images/lock.svg';
import { ReactComponent as ContactIcon } from '../../images/contact.svg';
import { ReactComponent as NextIcon } from '../../images/next.svg';

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

	//logout function
	const logout = (e) => {
		// Remove local storage.
		localStorage.removeItem('authToken');
		localStorage.removeItem('user');

		// Set default header.
		axiosClient.defaults.headers.common['Authorization'] = '';

		collapse(e);
	};

	//handle click menu collapse item
	const handleClickMenuCollapseItem = (e) => {
		setIsActive(null);
		collapse(e);
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
		'overlay-opacity': isShow,
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
				<hr />
				<Link
					to="/my-wallet"
					className="menu-collapse-item"
					onClick={handleClickMenuCollapseItem}
				>
					<div className="icon-box">
						<WalletIcon />
					</div>
					<div className="content-box">
						<div className="title">Ví của tôi</div>
						<div className="next-icon">
							<NextIcon />
						</div>
					</div>
				</Link>
				<Link
					to="/account/password"
					className="menu-collapse-item"
					onClick={handleClickMenuCollapseItem}
				>
					<div className="icon-box">
						<LockIcon />
					</div>
					<div className="content-box">
						<div className="title">Đổi mật khẩu</div>
						<div className="next-icon">
							<NextIcon />
						</div>
					</div>
				</Link>
				<Link
					to="/contact"
					className="menu-collapse-item"
					onClick={handleClickMenuCollapseItem}
				>
					<div className="icon-box">
						<ContactIcon />
					</div>
					<div className="content-box">
						<div className="title">Liên hệ chúng tôi</div>
						<div className="next-icon">
							<NextIcon />
						</div>
					</div>
				</Link>
				<Link to="/login" className="menu-collapse-item" onClick={logout}>
					<div className="icon-box">
						<LogoutIcon />
					</div>
					<div className="content-box">
						<div className="title">Đăng xuất</div>
					</div>
				</Link>
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
