import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../../services/usersServices";

/* */
export const useGetProfilesUserById = (id) => {
  return new useQuery({
    queryKey: ["getProfilessUsersById"],
    queryFn: () => usersApi.getProfilesUserById(id),
  });
};
