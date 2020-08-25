import React from 'react';

import Header from '../../components/Header/Header';

export default function (props) {
	const { isShow, collapseMenu } = props;

	return (
		<div className="Dashboard">
			<div className="HeaderWrapper">
				<Header isShow={isShow} collapseMenu={collapseMenu} />
			</div>
		</div>
	);
}
