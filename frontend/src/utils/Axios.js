import axios from "axios"
import SummaryApi, { baseURL } from "../common/SummaryApi"

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

Axios.interceptors.request.use(
    async(config)=> {
        const access_token = localStorage.getItem('access_token')
        if(access_token){
            config.headers.Authorization = `Bearer ${access_token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// entend the life span of access token with
// the help refresh

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error.config || {};
    if (error?.response?.status === 401 && !originRequest._retry) {
      originRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          originRequest.headers = originRequest.headers || {};
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
)

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios({
            method: SummaryApi.refreshToken.method,
            url: `${baseURL}${SummaryApi.refreshToken.url}`,
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
        })
        const access_token = response.data?.data?.access_token
        if (access_token) {
            localStorage.setItem('access_token', access_token)
        }
        return access_token
    }catch (error) {
        console.error(error)
    }
}
export default Axios