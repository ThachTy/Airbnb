export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("account");
  if (user) {
    return JSON.parse(user);
  }
};

export const saveUserFromLocalStorage = (value) => {
  localStorage.setItem("account", JSON.stringify({ ...value }));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("account");
  if (getUserFromLocalStorage) return true;
  else return false;
};
