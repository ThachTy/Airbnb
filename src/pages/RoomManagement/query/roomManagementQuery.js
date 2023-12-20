import { useQuery } from "@tanstack/react-query";
import { phongService } from "../../../services/phongServices";

/* */
export const useGetRoomsManagementPerPage = (currentPage, pageSize) => {
  return new useQuery({
    queryKey: ["getRoomsManagementPerPage"],
    queryFn: () => fetchRoomsManagementByPerPage(currentPage, pageSize),
  });
};
/* */
// export const useSearchRoomsManagementByIdLocation = (id) => {
//   return new useQuery({
//     queryKey: ["searchUsersByIdLocation", id],
//     queryFn: () => fetchSearchRoomsManagementByIdLocation(id),
//   });
// };

/* Function */
export const fetchRoomsManagementByPerPage = async (currentPage, pageSize) => {
  try {
    let response = await phongService
      .getRoomsByPerPage(currentPage, pageSize)
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

export const fetchSearchRoomsManagementByIdLocation = async (id) => {
  try {
    let response = await phongService
      .getRoomsByIdLocation(id)
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
