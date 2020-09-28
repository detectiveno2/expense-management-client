import axiosClient from './axiosClient';

const walletApi = {
	get: () => {
		const url = '/wallet';
		return axiosClient.get(url);
	},

	add: (data) => {
		const url = '/wallet/add';
		return axiosClient.post(url, data);
	},

	updateWalletName: (data) => {
		const url = '/wallet/update/wallet-name';
		return axiosClient.patch(url, data);
	},

	deleteWallet: (walletId) => {
		const url = `/wallet/${walletId}/delete`;
		return axiosClient.delete(url);
	},

	modifyBalance: (data) => {
		const url = '/wallet/update/balance';
		return axiosClient.patch(url, data);
	},
};

export default walletApi;
