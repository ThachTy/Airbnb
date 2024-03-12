import { removeUserFromLocalStorage } from "./localStorage";
/* */
export const handleLogOut = () => {
  removeUserFromLocalStorage() && console.log("Log out successful");
  window.location.assign("/");
};
