import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://192.168.26.2:3000'
});

export const ip_address = 'http://192.168.26.2:3000'
