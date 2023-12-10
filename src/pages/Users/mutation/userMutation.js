import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../../services/usersServices";

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id) => {
      let response = await usersApi.deleteUserById(id);
      return response;
    },
  });
};

export const usePostNewUserMutation = () => {
  return useMutation({
    mutationKey: ["postUser"],
    mutationFn: async (newUser = {}) => {
      try {
        let response = await usersApi
          .postUser(newUser)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePutNewUserMutation = () => {
  return useMutation({
    mutationKey: ["putUser"],
    mutationFn: async (newUser = {}) => {
      try {
        let response = await usersApi
          .putUser(newUser.id, newUser)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
