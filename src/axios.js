import axios from 'axios';

export const tiphoneApi = axios.create({
  baseURL: `${process.env.TIPHONE_URL}`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  proxy: {
    protocol: `${process.env.TRI_PROXY_PROTOCOL}`,
    host: `${process.env.TRI_PROXY_HOST}`,
    port: `${process.env.TRI_PROXY_PORT}`,
    auth: {
      username: `${process.env.TRI_PROXY_USERNAME}`,
      password: `${process.env.TRI_PROXY_PASSWORD}`,
    }
  }
});
