import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../../services/bookingServices";

/* */
export const useGetAllBookings = () => {
  return new useQuery({
    queryKey: ["getAllBookings"],
    queryFn: () => fetchAllBookings(),
  });
};

/* */
export const useSearchBookingsById = (id) => {
  return new useQuery({
    queryKey: ["searchUsersByName", id],
    queryFn: () => fetchSearchBookingsById(id),
  });
};

/* Function */
export const fetchAllBookings = async () => {
  try {
    let response = await bookingApi
      .getAllBookings()
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
    return response?.data?.content;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSearchBookingsById = async (id) => {
  try {
    let response = await bookingApi
      .getBookingByIdUser(id)
      .then((res) => {
        return res.data.content;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};
