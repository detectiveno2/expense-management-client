import React, { useContext, useEffect, useState } from 'react';
import { Select } from 'antd';
import moment from 'moment';
import Swiper from 'react-id-swiper';

import { WalletContext } from '../../contexts/WalletContext';

import SwiperConfig from '../../components/Swiper/Swiper';
import LoadingPage from '../Loading/Loading';
import Chart from '../../components/Chart/Chart';

import './Report.css';

const { Option } = Select;

export default function () {
	const { wallets, isLoaded, getExpenseOfMonth } = useContext(WalletContext);

	const [loaded, setLoaded] = useState(false);
	const [months, setMonths] = useState([]);
	const [monthActive, setMonthActive] = useState(new Date());

	// add monthActive when slide next transition start
	const addMonths = (date, month) => {
		const result = new Date(date);
		result.setMonth(result.getMonth() + month);
		setMonthActive(result);
	};

	// decrease monthActive when slide prev transition start
	const decreaseMonths = (date, month) => {
		const result = new Date(date);
		result.setMonth(result.getMonth() - month);
		setMonthActive(result);
	};

	// make months array function
	const makeArray = (monthActive, diff = 2) => {
		const currentMonth = moment(monthActive).format('MM/YYYY');
		const monthArr = [currentMonth];

		for (let i = 1; i <= diff; i++) {
			monthArr.push(moment(monthActive).add(i, 'month').format('MM/YYYY'));
			monthArr.unshift(
				moment(monthActive).subtract(i, 'month').format('MM/YYYY')
			);
		}

		setMonths([...monthArr]);
		setLoaded(true);
	};

	// make months array when slide change
	useEffect(() => {
		makeArray(monthActive);
	}, [monthActive, loaded]);

	if (!isLoaded || !loaded) {
		return <LoadingPage />;
	}

	// get wallet name
	let walletNames;
	if (wallets && wallets.length > 0) {
		walletNames = wallets.map((item) => item.walletName);
	}

	// onchange select wallet
	const onChange = (value) => {
		console.log(`selected ${value}`);
	};

	const params = {
		initialSlide: 2,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
			renderBullet: (index, className) => {
				return '<span class="' + className + '">' + months[index] + '</span>';
			},
		},
		on: {
			slideNextTransitionStart: () => {
				console.log({ next: monthActive.getMonth() + 1 });
				return addMonths(monthActive, 1);
			},
			slidePrevTransitionStart: () => {
				console.log({ prev: monthActive.getMonth() + 1 });
				return decreaseMonths(monthActive, 1);
			},
		},
	};

	console.log({ state: monthActive.getMonth() + 1 });

	return (
		<div className="report">
			{/* <Select
				defaultValue={walletNames.length > 0 && walletNames[0]}
				className="mb-5 ml-2"
				showSearch
				style={{ width: 200 }}
				placeholder="Select a wallet"
				optionFilterProp="children"
				onChange={onChange}
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			>
				{walletNames.map((item, index) => (
					<Option value={item} key={index}>
						{item}
					</Option>
				))}
			</Select> */}
			<Swiper {...params}>
				<div>
					<Chart />
				</div>
				<div>
					<Chart />
				</div>
				<div>
					<Chart />
				</div>
				<div>
					<Chart />
				</div>
				<div>
					<Chart />
				</div>
			</Swiper>
		</div>
	);
}
