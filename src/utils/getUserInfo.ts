export function setUserInfo(data: string) {
  localStorage.setItem("userInfo", data);
}

export function getUserInfo() {
  return localStorage.getItem("userInfo");
}

export function removeUserInfo() {
  localStorage.removeItem("userInfo");
}
