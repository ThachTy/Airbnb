import { http } from "./config";

export const usersApi = {
  /* Get Users by Perpage*/
  getUsersByPerPage: async (numberPage = 1, pageSize) => {
    return await http
      .get(
        `/users/phan-trang-tim-kiem?pageIndex=${numberPage}&pageSize=${pageSize}`
      )
      .then((res) => {
        return res;
      });
  },

  /* Delete User by Id */
  // https://airbnbnew.cybersoft.edu.vn/api/users/4079
  deleteUserById: async (id = 0) => {
    return await http.delete(`/users/${id}`);
  },

  /* Put User */
  //https://airbnbnew.cybersoft.edu.vn/api/users/1234
  putUser: async (id = 0, newUser = {}) => {
    return await http.put(`/users/${id}`, newUser);
  },

  /* Post New User */
  postUser: async (newUser) => {
    return await http.post(`/users/`, newUser);
  },

  /* Search User by Name */
  // https://airbnbnew.cybersoft.edu.vn/api/users/search/Nguyen%20
  searchUserByName: async (name) => {
    return await http.get(
      `https://airbnbnew.cybersoft.edu.vn/api/users/search/${name}`
    );
  },

  /* Get Details User by Id */
  // https://airbnbnew.cybersoft.edu.vn/api/users/4258
  getProfilesUserById: async (id) => {
    return await http.get(`https://airbnbnew.cybersoft.edu.vn/api/users/${id}`);
  },
};
