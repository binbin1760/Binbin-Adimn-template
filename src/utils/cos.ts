import { objectService } from "@/api";
import COS from "cos-js-sdk-v5";
import { v4 as uuidv4 } from "uuid";
interface VoucherType {
  credentials: Record<string, string>;
  requestId: string;
  expiration: string;
  start_time: number;
  expired_time: number;
  bucket: string;
  region: string;
  folder: string;
}
//  存储 读取 下载凭证
export function saveDownVoucher(data: VoucherType) {
  const temp = JSON.stringify(data);
  localStorage.setItem("DownVouncher", temp);
}
export function getDownVoucher() {
  const data = localStorage.getItem("DownVouncher");
  return JSON.parse(data as string);
}
//  存储 读取 上传凭证
export function saveUploadVoucher(data: VoucherType) {
  const temp = JSON.stringify(data);
  localStorage.setItem("UploadVouncher", temp);
}
export function getUploadVoucher() {
  const data = localStorage.getItem("UploadVouncher");
  return JSON.parse(data as string);
}

export async function getOssObj() {
  if (getDownVoucher()) {
    const voucher = (await objectService.getDownLoadVoucher()).toObject();
    console.log(voucher);
  }
}
const uuid = uuidv4();
export async function uploadOssObj(name: string, obj: File) {
  const voucher = (await objectService.getUploadVoucher()).toObject();
  const Bucket = voucher.bucket;
  const Region = voucher.region;
  const credentials = voucher.credentials;
  const folder = voucher.folder;
  var cos = new COS({
    getAuthorization: function (options: any, callback: any) {
      callback({
        TmpSecretId: credentials?.tmpSecretId,
        TmpSecretKey: credentials?.tmpSecretKey,
        SecurityToken: credentials?.sessionToken,
        StartTime: voucher.startTime,
        ExpiredTime: voucher.expiredTime,
      });
    },
  });
  const result = name.split(".");
  const imgType = result.pop();
  let cosRes: any = undefined;
  function uploadToCos() {
    return new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket,
          Region,
          Key: `${uuid.replace(/-/g, "")}.${imgType}`,
          Body: obj,
        },
        function (err: any, data: any) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  async function getCosValue() {
    try {
      const cosRes = await uploadToCos();
      return cosRes;
    } catch (err) {
      console.error(err);
    }
  }
  cosRes = await getCosValue();
  return { imgType, cosRes, folder };
}
