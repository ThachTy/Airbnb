import { useMutation } from "@tanstack/react-query";
import { locationsApi } from "../../../services/locationServices";

export const useDeleteLocationMutation = () => {
  const number = new Date().valueOf();
  return useMutation({
    mutationKey: ["deleteLocation", number],
    mutationFn: async (id) => {
      try {
        let response = await locationsApi
          .deleteLocationsById(id)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePostNewLocationMutation = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["postLocation", number],
    mutationFn: async (newLocation = {}) => {
      try {
        let response = await locationsApi
          .postLocation(newLocation)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePutNewLocationMutation = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["putLocation", number],
    mutationFn: async (newLocation = {}) => {
      try {
        let response = await locationsApi
          .putLocation(newLocation.id, newLocation)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
