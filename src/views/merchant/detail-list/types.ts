import {
  MediaMetaType,
  PurchasePackageCategory,
  ApprovalStat,
} from "@/protoJs";

export type Theme = {
  height: number;
  len: number;
  path: string;
  width: number;
  type: MediaMetaType;
};

export type Sections = {
  content: string;
  media: Theme;
};

export interface packageDetail {
  name: string;
  approvalDisableReason?: string;
  categories: Array<PurchasePackageCategory>;
  discountedPrice: number;
  originalPrice: number;
  isOnline: boolean;
  sections: Array<Sections>;
  theme: Theme;
  id: string;
  stat: ApprovalStat;
}
