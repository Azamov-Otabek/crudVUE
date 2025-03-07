import axios, {type AxiosInstance} from 'axios'

export const httpClient:AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
})
