import axios from 'axios';

axios.defaults.baseURL = 'https://star-review-api-99b8eca24b61.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
