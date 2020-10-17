import React from 'react';

import './Using.css';

import using1 from '../../images/using-1.png';
import using2 from '../../images/using-2.png';
import using3 from '../../images/using-3.png';
import using4 from '../../images/using-4.png';
import using5 from '../../images/using-5.png';
import using6 from '../../images/using-6.png';

export default function Using() {
	return (
		<div className="using">
			<div className="using__title">HƯỚNG DẪN SỬ DỤNG</div>
			<div className="using__container">
				<div className="using-item">
					<div className="using-item__title">
						1. Hãy click vào "Tạo ví" để điều hướng sang trang ví của tôi.
					</div>
					<div className="using-item__img">
						<img src={using1} alt="hinh anh"></img>
					</div>
				</div>
				<div className="using-item">
					<div className="using-item__title">
						2. Click vào nút bên dưới để tạo ví của mình.
					</div>
					<div className="using-item__img">
						<img src={using2} alt="hinh anh"></img>
					</div>
				</div>
				<div className="using-item">
					<div className="using-item__title">
						3. Sau khi tạo ví, click vào đây để thêm giao dịch mới.
					</div>
					<div className="using-item__img">
						<img src={using3} alt="hinh anh"></img>
					</div>
				</div>
				<div className="using-item">
					<div className="using-item__title">
						4. Vào sổ giao dịch trên thanh menu để xem giao dịch.
					</div>
					<div className="using-item__img">
						<img src={using4} alt="hinh anh"></img>
					</div>
				</div>
				<div className="using-item">
					<div className="using-item__title">
						Click vào giao dịch đã tạo để sửa hoặc xóa giao dịch.
					</div>
					<div className="using-item__img">
						<img src={using5} alt="hinh anh"></img>
					</div>
				</div>
				<div className="using-item">
					<div className="using-item__title">
						Click bugger trên menu {'>'} ví của tôi {'>'} chọn ví để chỉnh sửa
						ví.
					</div>
					<div className="using-item__img">
						<img src={using6} alt="hinh anh"></img>
					</div>
				</div>
				<div className="using__footer">
					*** Hãy sử dụng app để quản lí chi tiêu một cách khoa học nhé. ***
				</div>
			</div>
		</div>
	);
}
