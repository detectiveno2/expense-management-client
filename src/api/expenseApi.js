import axiosClient from './axiosClient';

const expenseApi = {
	add: (data) => {
		const url = '/expense/add';
		return axiosClient.post(url, data);
	},
};

export default expenseApi;
