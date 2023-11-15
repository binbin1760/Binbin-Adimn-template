// 手机校验
export function verifyPhone(value: any) {
  const reg = /^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$/;
  return reg.test(value);
}
// 验证邮箱
export function verifyEmail(value: any) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(value);
}
// 验证身份证
export function verifyIdCard(value: any) {
  const reg = /^\d{15}|\d{18}$/;
  return reg.test(value);
}
//验证银行卡
export function verifyBankCard(value: any) {
  const reg = /^([1-9]{1})(\d{15}|\d{18})$/;
  return reg.test(value);
}
// 其他验证规则
export function verifyReg(regString: string, verifyValue: any) {
  const reg = new RegExp(regString, "i");
  return reg.test(verifyValue);
}
