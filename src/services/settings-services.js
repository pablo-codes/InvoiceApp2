import http from '../http'

const create = (id, data) => {
    return http.post(`/create-settings/${id}`, data)
}
const get = (id)=>{
    return http.get(`/get-settings/${id}`)
}


const settingsService = { create,get }
export default settingsService