import axios from 'axios';

const AxiosOrders = axios.create({
    baseURL: 'https://emkay-burger-builder.firebaseio.com'
});

export default AxiosOrders;