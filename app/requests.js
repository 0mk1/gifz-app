import axios from 'axios';


export default function configureRequests() {
  // const baseURL = process.env.BACKEND_URL;
  const baseURL = 'http://localhost:8000/api/v1/';
  axios.defaults.baseURL = baseURL;
}
