import axios from 'axios';
import configuration from "../configuration.json";

export const config = {
    endpoint: `${configuration.backEndIp}/library/v1`,
};

const API_URL = config.endpoint;
export const getAllBooks = () => axios.get(`${API_URL}/books`);
export const borrowBook = (userName,phoneNumber,bookId) => axios.post(`${API_URL}/borrow/${userName}/${phoneNumber}/${bookId}`);
export const returnBook = (userName,phoneNumber,bookId) => axios.post(`${API_URL}/return/${userName}/${phoneNumber}/${bookId}`);
export const getUserBooks = (userName,phoneNumber) => axios.get(`${API_URL}/books/${userName}/${phoneNumber}`);
