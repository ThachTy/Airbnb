import { http } from "./config";

export const bookingApi = {
  getBookingByIdUser: (idUser = 0) => {
    return http.get(
      `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/lay-theo-nguoi-dung/${idUser}`
    );
  },
};
