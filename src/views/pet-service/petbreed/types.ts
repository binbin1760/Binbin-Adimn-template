export interface petBreedType {
  key: number;
  type: string;
  id: string;
  isRecommend: boolean;
  isRoot: boolean;
  pid: string;
  title: string;
  breed: string;
  theme: Array<Record<string, string>>;
  operate?: string;
}
