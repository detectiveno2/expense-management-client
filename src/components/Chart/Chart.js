import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';

import './Chart.css';

export default function ({ data }) {
	return (
		<div>
			<CalendarHeatmap
				tooltipDataAttrs={(value) => {
					return {
						'data-tip': `${value.date} - Chi phí: ${value.expense}`,
					};
				}}
				startDate={new Date(data[0].date)}
				endDate={new Date(data[data.length - 1].date)}
				values={data}
				classForValue={(val) => {
					const value = val.expense;
					return value === 0
						? 'color-empty'
						: 0 < value && value < 200000
						? 'color-green-1'
						: 200000 <= value && value < 500000
						? 'color-green-2'
						: 500000 <= value && value < 1000000
						? 'color-green-3'
						: value >= 1000000
						? 'color-green-4'
						: 0 > value && value > -200000
						? 'color-red-1'
						: -200000 >= value && value > -500000
						? 'color-red-2'
						: -500000 >= value && value > -1000000
						? 'color-red-3'
						: 'color-red-4';
				}}
			/>
			<ReactTooltip className="calendar-tooltip" />
		</div>
	);
}
