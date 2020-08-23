import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

import './LoadingButton.css';

export default function ({ textBtn, className, isLoading }) {
	return (
		<button className={className}>
			{(isLoading && <PulseLoader />) || textBtn}
		</button>
	);
}
