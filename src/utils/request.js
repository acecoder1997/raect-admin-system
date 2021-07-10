import axios from 'axios';

class Request {
    constructor() {
        this.init()
    }

    init() {
        this.createAxios()
        this.initInterceptorsRequest()
        this.initInterceptorsResponse()
    }

    createAxios() {
        this.axios = new axios.create({
            baseURL: 'http://localhost:5000',
            timeout: 2 * 60 * 1000 // 请求超时时间
        })
    }

    initInterceptorsRequest() {
        const onFulfilled = conf => conf
        const onRejected = err => Promise.reject(err)
        this.axios.interceptors.request.use(onFulfilled, onRejected)
    }

    initInterceptorsResponse() {
        const onFulfilled = res => res.data
        const onRejected = err => {
            const res = err.response
            return Promise.reject(res ? res.data : err);
        }
        this.axios.interceptors.response.use(onFulfilled, onRejected)
    }
}

export default Request
