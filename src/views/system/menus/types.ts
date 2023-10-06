export interface MenusType {
  key: string;
  id: string;
  title: string;
  type: number;
  icon: string;
  componentName: string;
  sort: number;
  identity: string;
  isFrame: boolean;
  noCache: boolean;
  hidden: boolean;
  child: Array<{ label: string; value: string }>;
}
