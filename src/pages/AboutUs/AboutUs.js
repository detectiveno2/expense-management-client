import React from 'react';
import AOS from 'aos';

import 'aos/dist/aos.css';
import './AboutUs.css';

import thien from '../../images/thien.png';
import hieu from '../../images/hieu.jpg';
import trung from '../../images/trung.jpg';
import { ReactComponent as NextIcon } from '../../images/next.svg';

AOS.init();

export default function AboutUs() {
	return (
		<div className="AboutUs">
			<div className="about-us-title">
				<h1>Xin chào</h1>
				<div>
					Đây là một pet project của chúng tôi khi tham gia khóa học codersX
					2020, dùng để quản lí chi tiêu của bản thân và từ đó giúp chúng ta có
					thể chi tiêu một cách hợp lí và khoa học hơn.
				</div>
				<div className="dir">
					<p>Kéo xuống để xem tiếp</p>
					<NextIcon />
				</div>
			</div>
			<hr />
			<div className="main-content">
				<h3 className="title">Giới thiệu một chút về thành viên</h3>
			</div>
			<div className="member" data-aos="fade-right">
				<div className="avatar">
					<img src={thien} alt="thien" />
				</div>
				<div className="introduction">
					<span>Nguyễn Công Nhật Thiên</span>. Vâng với cái tên đã thấy được sự
					nguy hiểm của anh chàng này, Nhật Thiên hay "ngàn ngày" đủ để thấy anh
					sánh ngang với trời đất. Thiên sinh năm 2000 và hiện tại là sinh viên
					năm 3 của DTU, trong pet project này Thiên với vai trò là leader của
					team, cùng với sự tỉ mỉ, thông minh Thiên luôn là nơi để đặt niềm tin
					và tin tưởng. Thật "pơ phẹt" quá đi. Và bật mí thêm nếu mọi người ngờ
					ngợ, thì đó là khuôn mặt của Thiên rất chi là giống với một người rất
					là nổi tiếng trong cộng đồng mạng lúc này TRẦN ĐỨC BO.
				</div>
			</div>
			<div className="member member-swap" data-aos="fade-left">
				<div className="avatar">
					<img src={hieu} alt="hieu" />
				</div>
				<div className="introduction">
					<span>Nguyễn Hiếu</span>. Một chàng trai đến từ xứ Huế mộng mơ, anh là
					một người có vẻ ngoài cứng rắn, nhưng bên trong là một tâm hồn mong
					manh, anh có một tình yêu đặt biệt với mèo. Hiếu sinh năm 1999, sinh
					viên năm 3 của DTU, với một vẻ ngoài điển trai, chơi thể thao hay nên
					giờ Hiếu vẫn chưa có người yêu. Có những lúc Hiếu làm team khá puồn về
					việc test api của Hiếu, nhưng tài năng của Hiếu thì không thể phủ
					nhận. Vjp
				</div>
			</div>
			<div className="member" data-aos="fade-up">
				<div className="avatar">
					<img src={trung} alt="trung" />
				</div>
				<div className="introduction">
					<span>Trần Văn Tuấn Trung</span>. Đây là một anh chàng tài năng nhất
					của team. sinh năm 2000, là sinh viên năm 3 của DTU, Trung đến từ
					Quảng Nam, với vẻ ngoài đẹp trai và năng động không biết bao nhiêu cô
					gái đã gục ngã vì Trung. Trong team Trung luôn hoàn thành tốt mọi công
					task mà leader giao cho một cách hoàn hảo, còn bên ngoài Trung luôn là
					người mà bạn bè tin tưởng. Thật là không có điểm nào chê được. Nếu mọi
					người thắc mắc vì sao Trung hoàn hảo đến vậy thì câu trả lời là Trung
					là người được phân công viết trang giới thiệu này hehe.
				</div>
			</div>
		</div>
	);
}
