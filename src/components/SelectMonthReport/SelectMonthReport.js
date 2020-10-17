import React, { useContext } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';

import './SelectMonthReport.css';

export default function () {
	const history = useHistory();

	// onchange select wallet
	const onChange = (date, dateString) => {
		history.push(`/report/${dateString}`);
	};

	return (
		<DatePicker defaultValue={moment()} onChange={onChange} picker="month" />
	);
}
