import axios from "axios";
// import process from 'process';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

// export const baseURL = () => {
//   return process.env.VITE_SERVER_BASE_URL;
// }

