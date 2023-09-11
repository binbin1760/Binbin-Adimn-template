export interface userTable {
  key: number;
  type: string;
  userName: string;
  nickName: string; //昵称
  sex: 0 | 1;
  company: string;
  phone: string;
  email: string;
  status: boolean;
  operate?: string;
}
