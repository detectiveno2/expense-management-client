import axiosClient from './axiosClient';

const authApi = {
	checkAuth: () => {
		const url = '/auth';
		return axiosClient.get(url);
	},

	changePassword: (data) => {
		const url = '/auth/change-password';
		return axiosClient.post(url, data);
	},
};

export default authApi;
