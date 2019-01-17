import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://emkay-firebase-2309.firebaseio.com/'
});

export default instance;