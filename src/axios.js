import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9999',
    withCredentials: false,
    timeout: 5000
})

instance.interceptors.request.use(config => {
    let token = sessionStorage.getItem('token')
    if(token){
        config.headers.token = token
    }
    console.dir(config)
    return config;
}, error => {
    return Promise.reject(error);
})

export default instance