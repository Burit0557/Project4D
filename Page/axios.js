import axios from 'axios';

// const kmitl = 'http://161.246.5.138:8080'
// const local = 'http://192.168.56.1:3000'
export const API = axios.create({
    baseURL: 'http://161.246.5.138:8080'
});

export const ip_address = 'http://161.246.5.138:8080'