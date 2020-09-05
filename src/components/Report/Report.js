import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';

import { WalletContext } from '../../contexts/WalletContext';
import './Report.css';

export default function () {
	const { wallets } = useContext(WalletContext);

	const dataChart = [65, 59, 80, 81, -40];
	const setColor = (data) =>
		data < 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)';

	const data = {
		labels: ['January', 'February', 'March', 'April', 'May'],
		datasets: [
			{
				label: ['adu'],
				backgroundColor: dataChart.map(setColor),
				borderColor: dataChart.map(setColor),
				data: dataChart,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			yAxes: [
				{
					ticks: {
						suggestedMin: -60,
						suggestedMax: 60,
					},
				},
			],
		},
		tooltips: {
			intersect: false,
		},
	};

	return (
		<div className="Report">
			<div></div>
			<Bar data={data} options={options} />
		</div>
	);
}
