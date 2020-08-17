import axiosClient from './axiosClient';

const userApi = {
	login: (data) => {
		const url = '/auth/login';
		return axiosClient
			.post(url, data)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	},
	register: (data) => {
		const url = '/auth/register';
		return axiosClient
			.post(url, data)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	},
};

export default userApi;
