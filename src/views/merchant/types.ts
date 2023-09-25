export interface Merchant {
  key: string | number;
  type: string;
  name: string;
  address: string;
  phoneNumber: Array<string>;
  updateAt: string;
  stat: number;
}
