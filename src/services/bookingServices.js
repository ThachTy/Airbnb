import { http } from "./config";

export const bookingApi = {
  getBookingByIdUser: (idUser = 0) => {
    return http.get(
      `https://airbnbnew.cybersoft.edu.vn/api/dat-phong/lay-theo-nguoi-dung/${idUser}`
    );
  },

  /* Get Booking by Perpage*/
  // https://airbnbnew.cybersoft.edu.vn/api/dat-phong
  getAllBookings: async () => {
    return await http.get(`/dat-phong/`);
  },

  /* Delete User by Id */
  deleteBookingsById: async (id = 0) => {
    return await http.delete(`/dat-phong/${id}`);
  },

  /* Put User */
  putBooking: async (id = 0, newBooking = {}) => {
    return await http.put(`/dat-phong/${id}`, newBooking);
  },

  /* Post New User */
  postBooking: async (newBooking) => {
    return await http.post(`/dat-phong/`, newBooking);
  },
};
