import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import Swiper from 'react-id-swiper';
import { useLocation } from 'react-router-dom';

import { WalletContext } from '../../contexts/WalletContext';

import SwiperConfig from '../../components/Swiper/Swiper';
import LoadingPage from '../Loading/Loading';
import Chart from '../../components/Chart/Chart';

import './Report.css';

export default function () {
	const { getAllExpense, currentWallet, getExpenseOfDayInMonth } = useContext(
		WalletContext
	);

	const [isLoaded, setIsLoaded] = useState(false);
	const [months, setMonths] = useState([]);

	//set data for chart
	const [data, setData] = useState(null);

	let location = useLocation();

	// make months array function
	const makeArray = (location, diff = 6) => {
		let monthArr = ['Tháng trước', 'Tháng này'];

		let getMonthOfLocation = location.split('/')[2];

		if (getMonthOfLocation === undefined) {
			for (let i = 2; i <= diff; i++) {
				monthArr.unshift(
					moment(new Date()).subtract(i, 'month').format('MM-YYYY')
				);
			}
		} else {
			monthArr = [getMonthOfLocation];
		}

		setMonths([...monthArr]);
		setIsLoaded(true);
	};

	// get last day of month
	const lastday = (year, month) => {
		return new Date(year, month, 0).getDate();
	};

	useEffect(() => {
		if (currentWallet) {
			getExpenseOfDayInMonth(location.pathname.split('/')[2], currentWallet);
		}
	}, [currentWallet, location]);

	useEffect(() => {
		const path = location.pathname;

		const month = path.substring(path.length - 2, path.length);
		const year = path.substring(path.length - 3, path.length - 7);
		const lastDay = lastday(month, year);
		if (currentWallet) {
			if (lastDay) {
				const data = Array.from({ length: lastDay }, (_, i) => {
					if (i < 9) {
						return { date: `${year}/${month}/0${i + 1}`, expense: 0 };
					} else return { date: `${year}/${month}/${i + 1}`, expense: 0 };
				});
				const dataOfWallet = getExpenseOfDayInMonth(
					location.pathname.split('/')[2],
					currentWallet
				);

				// get data if there are identical dates
				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < dataOfWallet.length; j++) {
						if (data[i].date === dataOfWallet[j].date) {
							data[i].expense = dataOfWallet[j].expense;
						}
					}
				}
				setData([data]);
			} else {
				const data = [];
				const dataOfWallet = getAllExpense(currentWallet);

				const currentYear = new Date().getFullYear();
				const currentMonth = new Date().getMonth() + 1;

				// get data from 6 months ago
				for (let month = currentMonth; month >= currentMonth - 6; month--) {
					const arr = [];
					const lastDay = lastday(currentYear, month);

					for (let i = 1; i <= lastDay; i++) {
						if (month.toString().length === 1) {
							month = `0${month}`;
						}
						if (i.toString().length === 1) {
							i = `0${i}`;
						}
						arr.push({ date: `${currentYear}/${month}/${i}`, expense: 0 });
					}
					for (let i = 0; i < arr.length; i++) {
						for (let j = 0; j < dataOfWallet.length; j++) {
							if (arr[i].date === dataOfWallet[j].date) {
								arr[i].expense = dataOfWallet[j].expense;
							}
						}
					}

					data.unshift(arr);
				}
				setData(data);
			}
		}
	}, [location, currentWallet]);

	// make months array when slide change
	useEffect(() => {
		makeArray(location.pathname);
	}, [isLoaded, location.pathname]);

	if (!isLoaded || !data) {
		return <LoadingPage />;
	}

	const params = {
		initialSlide: (months.length > 0 && months.length - 1) || 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
			renderBullet: (index, className) => {
				return '<span class="' + className + '">' + months[index] + '</span>';
			},
			bulletActiveClass: `swiper-pagination-bullet-active ${
				months.length === 1 && 'center'
			}`,
		},
		rebuildOnUpdate: true,
	};

	return (
		<div className="report">
			<Swiper {...params}>
				{data.map((data, index) => (
					<div key={index}>
						<Chart data={data} key={index} />
					</div>
				))}
			</Swiper>
		</div>
	);
}
