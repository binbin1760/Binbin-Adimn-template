import { ApprovalStat } from "@/protoJs";
export interface PackageType {
  key: string;
  name: string;
  merchant: string;
  categories: Array<string>;
  updateAt: number;
  stat: ApprovalStat;
}
