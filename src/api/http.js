import { create } from 'axios'

const http = create({
  baseURL: process.env.REACT_APP_API_URL,
})

http.interceptors.response.use(function (response) {
  return response.data
})

export default http
