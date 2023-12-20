import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../../services/usersServices";

export const useDeleteUserMutation = () => {
  const number = new Date().valueOf();
  return useMutation({
    mutationKey: ["deleteUser", number],
    mutationFn: async (id) => {
      try {
        let response = await usersApi
          .deleteUserById(id)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePostAvavtarUser = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["postAvatarUser", number],
    mutationFn: (variables) => updateAvatarUser(variables),
  });
};

export const usePostNewUserMutation = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["postUser", number],
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

export const usePutNewUserMutation = (id) => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["putUser", id, number],
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

export const updateAvatarUser = async (avatar) => {
  try {
    let response = await usersApi
      .uploadAvatar(avatar)
      .then((res) => res)
      .catch((err) => err);
    return response;
  } catch (error) {
    console.error(error);
  }
};
