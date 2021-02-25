import axios from 'axios';

// This makes it so we can use shortened url with api calls
export default axios.create({
  baseURL: `http://localhost:8080/`,
  withCredentials: true
});