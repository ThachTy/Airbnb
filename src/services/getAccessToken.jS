export const getAccessToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user)?.accessToken;
    }
  };