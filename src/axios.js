import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.wegiel.net/jsonapi'
});

export default instance;