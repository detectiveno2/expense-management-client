import axiosClient from './axiosClient';

const userApi = {
	login: async (data) => {
		const url = '/auth/login';
		return await axiosClient.post(url, data);
	},
	register: async (data) => {
		const url = '/auth/register';
		return await axiosClient.post(url, data);
	},
};

export default userApi;
