import axiosClient from './axiosClient';

const walletApi = {
	get: () => {
		const url = '/wallet';
		return axiosClient.get(url);
	},
};

export default walletApi;
