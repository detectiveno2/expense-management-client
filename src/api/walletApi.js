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
};

export default walletApi;
