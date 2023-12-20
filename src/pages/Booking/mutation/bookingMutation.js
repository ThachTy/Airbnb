import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "../../../services/bookingServices";

export const useDeleteBookingMutation = () => {
  const number = new Date().valueOf();
  return useMutation({
    mutationKey: ["deleteBooking", number],
    mutationFn: async (id) => {
      try {
        let response = await bookingApi
          .deleteBookingsById(id)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePostNewBookingMutation = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["postBooking", number],
    mutationFn: async (newBooking = {}) => {
      try {
        let response = await bookingApi
          .postBooking(newBooking)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePutNewBookingMutation = () => {
  const number = new Date().valueOf();

  return useMutation({
    mutationKey: ["putBooking", number],
    mutationFn: async (newBooking = {}) => {
      try {
        let response = await bookingApi
          .putBooking(newBooking.id, newBooking)
          .then((res) => res)
          .catch((err) => err);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
