/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.20.3
 * source: role.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
// @ts-nocheck
import * as dependency_1 from "./enums";
import * as dependency_2 from "./page";
import * as pb_1 from "google-protobuf";
export class RoleViewModel extends pb_1.Message {
  #one_of_decls: number[][] = [];
  constructor(
    data?:
      | any[]
      | {
          id?: string;
          name?: string;
          remark?: string;
          pIds?: string[];
          sort?: number;
          status?: dependency_1.Status;
          level?: number;
        }
  ) {
    super();
    pb_1.Message.initialize(
      this,
      Array.isArray(data) ? data : [],
      0,
      -1,
      [4],
      this.#one_of_decls
    );
    if (!Array.isArray(data) && typeof data == "object") {
      if ("id" in data && data.id != undefined) {
        this.id = data.id;
      }
      if ("name" in data && data.name != undefined) {
        this.name = data.name;
      }
      if ("remark" in data && data.remark != undefined) {
        this.remark = data.remark;
      }
      if ("pIds" in data && data.pIds != undefined) {
        this.pIds = data.pIds;
      }
      if ("sort" in data && data.sort != undefined) {
        this.sort = data.sort;
      }
      if ("status" in data && data.status != undefined) {
        this.status = data.status;
      }
      if ("level" in data && data.level != undefined) {
        this.level = data.level;
      }
    }
  }
  get id() {
    return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
  }
  set id(value: string) {
    pb_1.Message.setField(this, 1, value);
  }
  get name() {
    return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
  }
  set name(value: string) {
    pb_1.Message.setField(this, 2, value);
  }
  get remark() {
    return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
  }
  set remark(value: string) {
    pb_1.Message.setField(this, 3, value);
  }
  get pIds() {
    return pb_1.Message.getFieldWithDefault(this, 4, []) as string[];
  }
  set pIds(value: string[]) {
    pb_1.Message.setField(this, 4, value);
  }
  get sort() {
    return pb_1.Message.getFieldWithDefault(this, 5, 0) as number;
  }
  set sort(value: number) {
    pb_1.Message.setField(this, 5, value);
  }
  get status() {
    return pb_1.Message.getFieldWithDefault(
      this,
      6,
      dependency_1.Status._Status_UNSPECIFIED
    ) as dependency_1.Status;
  }
  set status(value: dependency_1.Status) {
    pb_1.Message.setField(this, 6, value);
  }
  get level() {
    return pb_1.Message.getFieldWithDefault(this, 7, 0) as number;
  }
  set level(value: number) {
    pb_1.Message.setField(this, 7, value);
  }
  static fromObject(data: {
    id?: string;
    name?: string;
    remark?: string;
    pIds?: string[];
    sort?: number;
    status?: dependency_1.Status;
    level?: number;
  }): RoleViewModel {
    const message = new RoleViewModel({});
    if (data.id != null) {
      message.id = data.id;
    }
    if (data.name != null) {
      message.name = data.name;
    }
    if (data.remark != null) {
      message.remark = data.remark;
    }
    if (data.pIds != null) {
      message.pIds = data.pIds;
    }
    if (data.sort != null) {
      message.sort = data.sort;
    }
    if (data.status != null) {
      message.status = data.status;
    }
    if (data.level != null) {
      message.level = data.level;
    }
    return message;
  }
  toObject() {
    const data: {
      id?: string;
      name?: string;
      remark?: string;
      pIds?: string[];
      sort?: number;
      status?: dependency_1.Status;
      level?: number;
    } = {};
    if (this.id != null) {
      data.id = this.id;
    }
    if (this.name != null) {
      data.name = this.name;
    }
    if (this.remark != null) {
      data.remark = this.remark;
    }
    if (this.pIds != null) {
      data.pIds = this.pIds;
    }
    if (this.sort != null) {
      data.sort = this.sort;
    }
    if (this.status != null) {
      data.status = this.status;
    }
    if (this.level != null) {
      data.level = this.level;
    }
    return data;
  }
  serialize(): Uint8Array;
  serialize(w: pb_1.BinaryWriter): void;
  serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
    const writer = w || new pb_1.BinaryWriter();
    if (this.id.length) writer.writeString(1, this.id);
    if (this.name.length) writer.writeString(2, this.name);
    if (this.remark.length) writer.writeString(3, this.remark);
    if (this.pIds.length) writer.writeRepeatedString(4, this.pIds);
    if (this.sort != 0) writer.writeUint32(5, this.sort);
    if (this.status != dependency_1.Status._Status_UNSPECIFIED)
      writer.writeEnum(6, this.status);
    if (this.level != 0) writer.writeUint32(7, this.level);
    if (!w) return writer.getResultBuffer();
  }
  static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RoleViewModel {
    const reader =
        bytes instanceof pb_1.BinaryReader
          ? bytes
          : new pb_1.BinaryReader(bytes),
      message = new RoleViewModel();
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;
      switch (reader.getFieldNumber()) {
        case 1:
          message.id = reader.readString();
          break;
        case 2:
          message.name = reader.readString();
          break;
        case 3:
          message.remark = reader.readString();
          break;
        case 4:
          pb_1.Message.addToRepeatedField(message, 4, reader.readString());
          break;
        case 5:
          message.sort = reader.readUint32();
          break;
        case 6:
          message.status = reader.readEnum();
          break;
        case 7:
          message.level = reader.readUint32();
          break;
        default:
          reader.skipField();
      }
    }
    return message;
  }
  serializeBinary(): Uint8Array {
    return this.serialize();
  }
  static deserializeBinary(bytes: Uint8Array): RoleViewModel {
    return RoleViewModel.deserialize(bytes);
  }
}
export class RolePageResponse extends pb_1.Message {
  #one_of_decls: number[][] = [];
  constructor(
    data?:
      | any[]
      | {
          page?: dependency_2.PagerResponse;
          raws?: RoleViewModel[];
        }
  ) {
    super();
    pb_1.Message.initialize(
      this,
      Array.isArray(data) ? data : [],
      0,
      -1,
      [2],
      this.#one_of_decls
    );
    if (!Array.isArray(data) && typeof data == "object") {
      if ("page" in data && data.page != undefined) {
        this.page = data.page;
      }
      if ("raws" in data && data.raws != undefined) {
        this.raws = data.raws;
      }
    }
  }
  get page() {
    return pb_1.Message.getWrapperField(
      this,
      dependency_2.PagerResponse,
      1
    ) as dependency_2.PagerResponse;
  }
  set page(value: dependency_2.PagerResponse) {
    pb_1.Message.setWrapperField(this, 1, value);
  }
  get hasPage() {
    return pb_1.Message.getField(this, 1) != null;
  }
  get raws() {
    return pb_1.Message.getRepeatedWrapperField(
      this,
      RoleViewModel,
      2
    ) as RoleViewModel[];
  }
  set raws(value: RoleViewModel[]) {
    pb_1.Message.setRepeatedWrapperField(this, 2, value);
  }
  static fromObject(data: {
    page?: ReturnType<typeof dependency_2.PagerResponse.prototype.toObject>;
    raws?: ReturnType<typeof RoleViewModel.prototype.toObject>[];
  }): RolePageResponse {
    const message = new RolePageResponse({});
    if (data.page != null) {
      message.page = dependency_2.PagerResponse.fromObject(data.page);
    }
    if (data.raws != null) {
      message.raws = data.raws.map((item) => RoleViewModel.fromObject(item));
    }
    return message;
  }
  toObject() {
    const data: {
      page?: ReturnType<typeof dependency_2.PagerResponse.prototype.toObject>;
      raws?: ReturnType<typeof RoleViewModel.prototype.toObject>[];
    } = {};
    if (this.page != null) {
      data.page = this.page.toObject();
    }
    if (this.raws != null) {
      data.raws = this.raws.map((item: RoleViewModel) => item.toObject());
    }
    return data;
  }
  serialize(): Uint8Array;
  serialize(w: pb_1.BinaryWriter): void;
  serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
    const writer = w || new pb_1.BinaryWriter();
    if (this.hasPage)
      writer.writeMessage(1, this.page, () => this.page.serialize(writer));
    if (this.raws.length)
      writer.writeRepeatedMessage(2, this.raws, (item: RoleViewModel) =>
        item.serialize(writer)
      );
    if (!w) return writer.getResultBuffer();
  }
  static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RolePageResponse {
    const reader =
        bytes instanceof pb_1.BinaryReader
          ? bytes
          : new pb_1.BinaryReader(bytes),
      message = new RolePageResponse();
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;
      switch (reader.getFieldNumber()) {
        case 1:
          reader.readMessage(
            message.page,
            () =>
              (message.page = dependency_2.PagerResponse.deserialize(reader))
          );
          break;
        case 2:
          reader.readMessage(message.raws, () =>
            pb_1.Message.addToRepeatedWrapperField(
              message,
              2,
              RoleViewModel.deserialize(reader),
              RoleViewModel
            )
          );
          break;
        default:
          reader.skipField();
      }
    }
    return message;
  }
  serializeBinary(): Uint8Array {
    return this.serialize();
  }
  static deserializeBinary(bytes: Uint8Array): RolePageResponse {
    return RolePageResponse.deserialize(bytes);
  }
}
