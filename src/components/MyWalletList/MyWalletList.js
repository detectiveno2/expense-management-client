import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import ReactLoading from 'react-loading';

import { WalletContext } from '../../contexts/WalletContext';
import { UserContext } from '../../contexts/UserContext';
import AddWalletBtn from '../AddWalletBtn/AddWalletBtn';

import { ReactComponent as BackIcon } from '../../images/back-icon.svg';
import WalletIcon from '../../images/wallet-icon.png';
import './MyWalletList.css';
import DeleteWalletBtn from '../DeleteWalletBtn/DeleteWalletBtn';

function MyWalletList() {
	const [selectedWallet, setSelectedWallet] = useState(null);
	const [listActive, setListActive] = useState(false);

	const { wallets } = useContext(WalletContext);
	const { currentUser } = useContext(UserContext);

	const walletListCls = classNames('my-wallet-list', {
		'my-wallet-list--active': listActive,
	});

	const handleItemClick = (index) => (event) => {
		const selectedWallet = wallets[index];
		setSelectedWallet(selectedWallet);
		setListActive(true);
	};

	const handleBackClick = () => {
		setListActive(false);
	};

	return wallets ? (
		<div className={walletListCls}>
			<div className="my-wl__container">
				<div className="my-wl__left">
					<div className="my-wl__title">Tính vào tổng</div>
					<div className="my-wl__list">
						{wallets &&
							wallets.map((wallet, index) => (
								<button
									key={wallet._id}
									className="my-wl__item"
									onClick={handleItemClick(index)}
								>
									<img
										src={WalletIcon}
										alt="wallet-item"
										className="my-wl__img-icon"
									/>
									<div className="my-wl__title-wl">
										<div className="my-wl__name-wl">{wallet.walletName}</div>
										<div className="my-wl__balance-wl">
											{wallet.accountBalance.toLocaleString()}
										</div>
									</div>
								</button>
							))}
					</div>
					<div className="my-wl__footer">
						<AddWalletBtn className="my-wl__add-btn" />
					</div>
				</div>
				<div className="my-wl__right">
					<div className="my-wl-r__header">
						<BackIcon className="my-wl-r__back-btn" onClick={handleBackClick} />
					</div>
					<div className="my-wl-r__main">
						<div className="my-wl-r__wl-avt">
							<img
								src={WalletIcon}
								alt="wallet-avatar"
								className="my-wl-r__wl-avt-img"
							/>
						</div>
						<div className="my-wl-r__wl-inf">
							<table className="my-wl-r__table">
								<tbody className="my-wl-r__table-body">
									<tr className="my-wl-r__t-row">
										<td className="my-wl-r__t-data">Tên ví</td>
										<td className="my-wl-r__t-data">
											{selectedWallet && `: ${selectedWallet.walletName}`}
										</td>
									</tr>
									<tr className="my-wl-r__t-row">
										<td className="my-wl-r__t-data">Số dư</td>
										<td className="my-wl-r__t-data">
											{selectedWallet &&
												`: ${selectedWallet.accountBalance.toLocaleString()}`}
										</td>
									</tr>
									<tr className="my-wl-r__t-row">
										<td className="my-wl-r__t-data">Đơn vị</td>
										<td className="my-wl-r__t-data">: Việt Nam đồng (VND)</td>
									</tr>
									<tr className="my-wl-r__t-row">
										<td className="my-wl-r__t-data">Người dùng</td>
										<td className="my-wl-r__t-data">
											{currentUser && `: ${currentUser.userName}`}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="my-wl-r__footer">
						<button className="my-wl-r__btn my-wl-r__btn--green">
							ĐỔI TÊN
						</button>
						<button className="my-wl-r__btn my-wl-r__btn--green">
							ĐIỀU CHỈNH SỐ DƯ
						</button>
						<DeleteWalletBtn
							className="my-wl-r__btn my-wl-r__btn--red"
							walletId={selectedWallet && selectedWallet._id}
							backToList={handleBackClick}
						/>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="my-wl__loading">
			<ReactLoading
				type="spin"
				color="#6de283"
				className="my-wl__loading-animation"
			/>
		</div>
	);
}

export default MyWalletList;
