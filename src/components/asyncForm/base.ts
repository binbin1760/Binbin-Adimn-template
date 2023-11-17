// 校验规则
const regList = {
  phone: /^1[3-9][0-9]{9}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  idCard: /^\d{15}|\d{18}$/,
  banckCard: /^([1-9]{1})(\d{15}|\d{18})$/,
};
// 其他验证规则
export function verifyReg(allow: string, value: any) {
  return regList[allow].test(value);
}
