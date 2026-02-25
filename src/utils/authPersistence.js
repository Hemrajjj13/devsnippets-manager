export const saveAuth = (authState) => {
  localStorage.setItem("auth", JSON.stringify(authState));
};

export const loadAuth = () => {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
};
