import React, { useContext, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

import AddExpenseModal from '../AddExpenseModal/AddExpenseModal';
import ListWallets from '../ListWallets/ListWallets';
import SelectMonthReport from '../SelectMonthReport/SelectMonthReport';

import { UserContext } from '../../contexts/UserContext';
import { MenuContext } from '../../contexts/MenuContext';
import { WalletContext } from '../../contexts/WalletContext';

import { ReactComponent as SearchIcon } from '../../images/search-icon.svg';
import { ReactComponent as CalendarIcon } from '../../images/calendar-icon.svg';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';
import WalletIcon from '../../images/wallet-icon.png';
import TotalIcon from '../../images/total-icon.png';

import './Header.css';

function Header() {
	const [showList, setShowList] = useState(false);

	const { currentUser } = useContext(UserContext);
	const { isShow, setIsShow } = useContext(MenuContext);
	const { currentWallet, virtualWallet } = useContext(WalletContext);

	// Get current date.
	const currentDate = moment().format('DD');

	// Get location
	let location = useLocation().pathname.slice(1);

	const handleBurgerClick = () => {
		setIsShow(!isShow);
	};

	const handleShowListClick = () => {
		setShowList(!showList);
	};

	return currentUser ? (
		<div className="Header">
			<div className="HeaderLeftWrapper">
				<div className="HeaderLeftContent">
					<button onClick={handleShowListClick}>
						{!currentWallet || !virtualWallet ? (
							<img src={TotalIcon} alt="total" />
						) : currentWallet.walletName === virtualWallet.walletName ? (
							<img src={TotalIcon} alt="total" />
						) : (
							<img src={WalletIcon} alt="wallet" />
						)}
						<div className="TitleAmount">
							<div>{currentWallet && currentWallet.walletName}</div>
							<div>
								{currentWallet && currentWallet.accountBalance.toLocaleString()}
							</div>
						</div>
					</button>
					{showList && (
						<ListWallets showList={showList} setShowList={setShowList} />
					)}
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
