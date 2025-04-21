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

Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error) =>{
        let originRequest = error.config
        if(error.response.status === 401 && !originRequest.retry){
            originRequest.retry = true
            const refreshToken = localStorage.getItem('refresh_token')
            if(refreshToken){

            }
        }
        return Promise.reject(error)
    }
)

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })
        const access_token = response.data.data.access_token
        localStorage.setItem('access_token')
        if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken)
            if (newAccessToken) {
                originRequest.headers.Authorization= `Bearer ${newAccessToken}`
                return Axios(originRequest)
            }
        }
    }catch (error) {
        console.error(error)
    }
}
export default Axios