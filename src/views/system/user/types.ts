import { Gender, Status } from "@/protoJs";
export interface userTable {
  key: string;
  nickName: string;
  gender: Gender;
  avatar: string;
  phone: string;
  roles: Array<string>;
  status: Status;
}
