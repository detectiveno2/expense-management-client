import React, { useContext } from 'react';
import moment from 'moment';

import AddExpenseModal from '../AddExpenseModal/AddExpenseModal';

import { UserContext } from '../../contexts/UserContext';
import { MenuContext } from '../../contexts/MenuContext';
import { WalletContext } from '../../contexts/WalletContext';

import { ReactComponent as SearchIcon } from '../../images/search-icon.svg';
import { ReactComponent as CalendarIcon } from '../../images/calendar-icon.svg';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';
import TotalIcon from '../../images/total-icon.png';

import './Header.css';

function Header() {
	const { currentUser } = useContext(UserContext);
	const { isShow, setIsShow } = useContext(MenuContext);
	const { total, currentWallets, wallets } = useContext(WalletContext);

	// Get current date.
	const currentDate = moment().format('DD');

	const handleBurgerClick = () => {
		setIsShow(!isShow);
	};

	return currentUser ? (
		<div className="Header">
			<div className="HeaderLeftWrapper">
				<div className="HeaderLeftContent">
					<button>
						<img src={TotalIcon} alt="total" />
						<div className="TitleAmount">
							<div>
								{currentWallets.length > 1
									? 'Tổng cộng'
									: currentWallets[0].walletName}
							</div>
							<div>{total.toLocaleString()}</div>
						</div>
					</button>
				</div>
			</div>
			<div className="HeaderRightWrapper">
				<div className="HeaderRightContent">
					<ul>
						<li>
							<button>
								<div className="CalendarIcon">
									<CalendarIcon width="20" height="20" />
									<span>{currentDate}</span>
								</div>
							</button>
						</li>
						<li>
							<button>
								<SearchIcon width="20" height="20" />
							</button>
						</li>
						<li>
							<AddExpenseModal />
						</li>
					</ul>
				</div>
			</div>
			<div className="burger-btn-container">
				<button className="burger-button" onClick={handleBurgerClick}>
					<MenuIcon />
				</button>
			</div>
		</div>
	) : (
		<div></div>
	);
}

export default Header;
