import axios from 'axios';
import store from '../store';

const getFetchInstance = () =>
  axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 5000,
    headers: { Authorization: `Bearer ${store.getState().user.token}` }
  });

export default getFetchInstance;
