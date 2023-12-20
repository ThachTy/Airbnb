import { http } from "./config";

export const phongService = {
  getRoomList: () => {
    return http.get("/phong-thue");
  },
  getDetailRoom: (idRoom) => {
    return http.get(`/phong-thue/${idRoom}`);
  },

  /* Get Rooms by Perpage*/
  getRoomsByPerPage: async (numberPage = 1, pageSize) => {
    return await http.get(
      `/phong-thue/phan-trang-tim-kiem?pageIndex=${numberPage}&pageSize=${pageSize}`
    );
  },

  /* Get Rooms by id Location*/
  getRoomsByIdLocation: async (idLocation) => {
    return await http.get(
      `/phong-thue/lay-phong-theo-vi-tri?maViTri=${idLocation}`
    );
  },

  /* Delete Room by Id */
  // https://airbnbnew.cybersoft.edu.vn/api/phong-thue/1204
  deleteRoomById: async (id = 0) => {
    return await http.delete(`/phong-thue/${id}`);
  },

  /* Put Room */
  //https://airbnbnew.cybersoft.edu.vn/api/phong-thue/1234
  putRoom: async (id = 0, newRoom = {}) => {
    return await http.put(`/phong-thue/${id}`, newRoom);
  },

  /* Post New Room */
  postRoom: async (newRoom) => {
    return await http.post(`/phong-thue/`, newRoom);
  },
};
