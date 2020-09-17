import axiosClient from './axiosClient';

const expenseApi = {
	add: (data) => {
		const url = '/expense/add';
		return axiosClient.post(url, data);
	},

	deleteExpense: (expenseId) => {
		const url = `/expense/${expenseId}/delete`;
		return axiosClient.delete(url);
	},

	updateExpense: (data) => {
		const url = '/expense/update';
		return axiosClient.patch(url, data);
	},
};

export default expenseApi;
