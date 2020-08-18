import axios from 'axios';

const authToken = localStorage.getItem('authToken');
const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
		authorization: authToken || null,
	},
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// Check if response is unauth or forbidden.
		const status = error.response.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem('authToken');
			axiosClient.defaults.headers.common['authorization'] = '';
		}

		throw error;
	}
);

export default axiosClient;
