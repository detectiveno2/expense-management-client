import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Swiper from 'react-id-swiper';

import SwiperConfig from '../../components/Swiper/Swiper';
import LoadingPage from '../Loading/Loading';
import Chart from '../../components/Chart/Chart';

import './Report.css';

export default function () {
	const [isLoaded, setIsLoaded] = useState(false);
	const [months, setMonths] = useState([]);
	const [monthActive, setMonthActive] = useState(new Date());

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
		setIsLoaded(true);
	};

	// make months array when slide change
	useEffect(() => {
		makeArray(monthActive);
	}, [monthActive, isLoaded]);

	if (!isLoaded) {
		return <LoadingPage />;
	}

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
	};

	return (
		<div className="report">
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
