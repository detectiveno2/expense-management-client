import React from 'react';

import ReactLoading from 'react-loading';

export default function () {
	return (
		<div className="Loading">
			<div className="dashboard__loading">
				<ReactLoading
					type="spin"
					color="#6de283"
					className="dashboard__loading-animation"
				/>
			</div>
		</div>
	);
}
