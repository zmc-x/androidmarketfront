import axios from 'axios'
axios.defaults.baseURL = 'api'
// axios.defaultes.baseURL = 'http://101.35.48.153:1234'
export function getHomeInfo() {
    return axios.get('/mall/v1/goods/marketinfo')
}