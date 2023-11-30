import { http } from "./config"

export const phongService = {
    getRoomList: () => {
        return http.get('/phong-thue')
    },
    getDetailRoom: (idRoom) => {
        return http.get(`/phong-thue/${idRoom}`)
    }
}