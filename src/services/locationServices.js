import { http } from "./config";

export const locationsApi = {
  /* Get Users by Perpage*/
  // https://airbnbnew.cybersoft.edu.vn/api/vi-tri
  getAllLocations: async () => {
    return await http.get(`/vi-tri`);
  },

  // https://airbnbnew.cybersoft.edu.vn/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=5
  getLocationsByPerPage: async (numberPage = 1, pageSize) => {
    return await http.get(
      `/vi-tri/phan-trang-tim-kiem?pageIndex=${numberPage}&pageSize=${pageSize}`
    );
  },

  /* Delete User by Id */
  deleteLocationsById: async (id = 0) => {
    return await http.delete(`/vi-tri/${id}`);
  },

  /* Put User */
  putLocation: async (id = 0, newLocation = {}) => {
    return await http.put(`/vi-tri/${id}`, newLocation);
  },

  /* Post New User */
  postLocation: async (newLocation) => {
    return await http.post(`/vi-tri/`, newLocation);
  },

  /* Search User by Name */
  searchLocationsByName: async (name) => {
    return await http.get(`/vi-tri/search/${name}`);
  },
};
