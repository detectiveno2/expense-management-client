import React, { useContext } from 'react';

import { WalletContext } from '../../contexts/WalletContext';

import { ReactComponent as Check } from '../../images/check.svg';
import TotalIcon from '../../images/total-icon.png';
import WalletIcon from '../../images/wallet-icon.png';
import './ListWallets.css';

function ListWallets({ showList, setShowList }) {
	const {
		wallets,
		currentWallet,
		virtualWallet,
		changeCurrentWallet,
	} = useContext(WalletContext);

	const handleBtnClick = (walletName) => (event) => {
		changeCurrentWallet(walletName);
		setShowList(!showList);
	};

	return (
		<div className="list-wallets">
			<div className="list-wallets__title">Chọn ví</div>
			<div className="list-wallets__item">
				<button
					className="list-wallets__btn"
					onClick={handleBtnClick(virtualWallet.walletName)}
				>
					<img src={TotalIcon} alt="total" className="list-wallets__img" />
					<div className="list-wallets__wallet-info">
						<div className="list-wallets__wallet-name">
							{virtualWallet && virtualWallet.walletName}
						</div>
						<div className="list-wallets__account-balance">
							{virtualWallet && virtualWallet.accountBalance.toLocaleString()}
						</div>
					</div>
					{currentWallet.walletName === virtualWallet.walletName && (
						<Check className="list-wallets__check" />
					)}
				</button>
			</div>
			<div className="list-wallets__title">Tính vào tổng</div>
			<ul className="list-wallets__list">
				{wallets.map((wallet) => (
					<li key={wallet._id} className="list-wallets__item">
						<button
							className="list-wallets__btn"
							onClick={handleBtnClick(wallet.walletName)}
						>
							<img src={WalletIcon} alt="total" className="list-wallets__img" />
							<div className="list-wallets__wallet-info">
								<div className="list-wallets__wallet-name">
									{wallet.walletName}
								</div>
								<div className="list-wallets__account-balance">
									{wallet.accountBalance.toLocaleString()}
								</div>
							</div>
							{currentWallet.walletName === wallet.walletName && (
								<Check className="list-wallets__check" />
							)}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ListWallets;
