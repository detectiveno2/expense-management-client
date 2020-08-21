import axiosClient from './axiosClient';

const authApi = {
	checkAuth: () => {
		const url = '/auth';
		return axiosClient.get(url);
	},
};

export default authApi;
