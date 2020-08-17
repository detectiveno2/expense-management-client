import axiosClient from './axiosClient';

const userApi = {
	login: (params) => {
		console.log(process.env.REACT_APP_API_URL);
		const url = '/auth/login';
		return axiosClient
			.post(url, params)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	},
	register: (params) => {
		const url = '/auth/register';
		return axiosClient
			.post(url, params)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	},
};

export default userApi;
