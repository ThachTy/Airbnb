import { useMutation } from "@tanstack/react-query";
import { phongService } from "../../../services/phongServices";

export const useDeleteRoomMutation = () => {
  const number = new Date().valueOf();
  return useMutation({
    mutationKey: ["deleteRoom", number],
    mutationFn: async (id) => {
      try {
        let response = await phongService
          .deleteRoomById(id)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePostNewRoomMutation = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["postRoom", number],
    mutationFn: async (newRoom = {}) => {
      try {
        let response = await phongService
          .postRoom(newRoom)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePutNewRoomMutation = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["putRoom", number],
    mutationFn: async (newRoom = {}) => {
      try {
        let response = await phongService
          .putRoom(newRoom.id, newRoom)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
