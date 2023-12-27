import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../../services/usersServices";

/* */
export const useGetUsersPerPage = (currentPage, pageSize) => {
  return new useQuery({
    queryKey: ["getUsersPerPage"],
    queryFn: () => fetchUserByPerPage(currentPage, pageSize),
  });
};
/* */
export const useGetProfilesUsersbyId = (id) => {
  return new useQuery({
    queryKey: ["getProfilesUsersbyId", id],
    queryFn: () => fetchProfilesUserById(id),
  });
};

/* */
export const useSearchUsersByName = (nameSearch) => {
  return new useQuery({
    queryKey: ["searchUsersByName"],
    queryFn: () => fetchSearchUserByName(nameSearch),
  });
};

/* Function */
export const fetchUserByPerPage = async (currentPage, pageSize) => {
  try {
    let response = await usersApi
      .getUsersByPerPage(currentPage, pageSize)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
    return response?.data.content;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProfilesUserById = async (id) => {
  try {
    let response = await usersApi
      .getProfilesUserById(id)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
    return response?.data.content;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchUserByName = async (name) => {
  try {
    let response = await usersApi
      .searchUsersByName(name)
      .then((res) => {
        return res?.data.content;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};
