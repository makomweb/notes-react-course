import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'https://emkay-burger-builder.firebaseio.com'
});

export default AxiosInstance;