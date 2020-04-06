const isAuthenticated = () => {
  let isAuthenticated = localStorage.getItem("access-token");

  return isAuthenticated ? true : false;
};

export default isAuthenticated;
