import React from 'react';
import moment from 'moment';

import AddExpenseModal from '../AddExpenseModal/AddExpenseModal';

import { ReactComponent as SearchIcon } from '../../images/search-icon.svg';
import { ReactComponent as CalendarIcon } from '../../images/calendar-icon.svg';
import TotalIcon from '../../images/total-icon.png';
import './Header.css';

function Header() {
	// Get current date.
	const currentDate = moment().format('DD');

	return (
		<div className="Header">
			<div className="HeaderLeftWrapper">
				<div className="HeaderLeftContent">
					<button>
						<img src={TotalIcon} alt="total" />
						<div className="TitleAmount">
							<div>Tổng cộng</div>
							<div>628613</div>
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
		</div>
	);
}

export default Header;
