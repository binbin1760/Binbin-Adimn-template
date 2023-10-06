import { Status } from "@/protoJs";
export interface RoleType {
  key: number;
  name: string;
  remark: string;
  pIds: Array<string>;
  status: Status;
}
