import { Status } from "@/protoJs";
export interface RoleType {
  key: string;
  name: string;
  remark: string;
  level: number;
  sort: number;
  pIds: Array<string>;
  status: Status;
}
