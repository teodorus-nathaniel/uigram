import axios from 'axios';
import store from '../store';

console.log(process.env.NODE_ENV);

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://uigram-api.herokuapp.com/api/v1'
    : 'http://localhost:8080/api/v1';

const getFetchInstance = () =>
  axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${store.getState().user.token}` }
  });

export default getFetchInstance;
