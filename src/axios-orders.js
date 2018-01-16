import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-shop-30d02.firebaseio.com/'
});

export default instance;
