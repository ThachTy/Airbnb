import { http } from "./config"

export const binhluanServices = {
    getCommentsByIdRoom: (idRoom) => {
        return http.get(`/binh-luan/lay-binh-luan-theo-phong/${idRoom}`)
    }
}