import axios from 'axios';

const ip = 'http://161.246.5.138:8080'
// const ip = 'http://192.168.56.1:3000'
export const API = axios.create({
    baseURL: ip
});

export const ip_address = ip