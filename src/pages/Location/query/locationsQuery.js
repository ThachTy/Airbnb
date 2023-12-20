import { useQuery } from "@tanstack/react-query";
import { locationsApi } from "../../../services/locationServices";

export const useGetAllLocations = () => {
  return new useQuery({
    queryKey: ["getAllLocations"],
    queryFn: () => fetchAllLocations(),
  });
};

/* */
export const useGetLocationsPerPage = (currentPage, pageSize) => {
  return new useQuery({
    queryKey: ["getUsersPerPage"],
    queryFn: () => fetchLocationsByPerPage(currentPage, pageSize),
  });
};

/* */
export const useSearchLocationsByName = (nameSearch) => {
  return new useQuery({
    queryKey: ["searchUsersByName"],
    queryFn: () => fetchSearchLocationsByName(nameSearch),
  });
};

/* Function */
export const fetchLocationsByPerPage = async (currentPage, pageSize) => {
  try {
    let response = await locationsApi
      .getLocationsByPerPage(currentPage, pageSize)
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

export const fetchSearchLocationsByName = async (name) => {
  try {
    let response = await locationsApi
      .searchLocationsByName(name)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllLocations = async () => {
  try {
    let response = await locationsApi
      .getAllLocations()
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
