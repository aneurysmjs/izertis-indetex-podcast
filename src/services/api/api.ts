import axios from 'axios';

const BASE_URL = 'https://itunes.apple.com';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;