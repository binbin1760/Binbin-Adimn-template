export function setUserInfo(data: string) {
  localStorage.setItem("token", data);
}

export function getUserInfo() {
  return localStorage.getItem("token");
}

export function removeUserInfo() {
  localStorage.removeItem("token");
}
