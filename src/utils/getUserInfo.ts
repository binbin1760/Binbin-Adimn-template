export function setUserInfo(token: string) {
  localStorage.setItem("toke", token);
}

export function getUserInfo() {
  return localStorage.getItem("token");
}

export function removeUserInfo() {
  localStorage.removeItem("token");
}
