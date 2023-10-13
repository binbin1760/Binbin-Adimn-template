export function setRolesInfo(data: string[]) {
  const roles = JSON.stringify(data);
  localStorage.setItem("role", roles);
}

export function getRolesInfo() {
  const roles = localStorage.getItem("role");
  return JSON.parse(roles as string);
}

export function removeRolesInfo() {
  localStorage.removeItem("role");
}
