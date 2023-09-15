import fetch from "@/utils/request";
import {
  PetBreedViewModel,
  CRUDResult,
  PetCategoryAllResponse,
  PetCategoryDetailsResponse,
} from "@/protoJs";

export class pets {
  static addPetbreed(request: PetBreedViewModel): Promise<CRUDResult> {
    return fetch({
      url: "/pet/admin/breed",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static classificationPet(): Promise<PetCategoryAllResponse> {
    return fetch({
      url: "/pet/breed/category",
      method: "GET",
      data: {
        resType: PetCategoryAllResponse,
      },
    });
  }
  static getChildBreed(
    categoryId: string
  ): Promise<PetCategoryDetailsResponse> {
    return fetch({
      url: `/pet/breed/${categoryId}`,
      method: "get",
      data: {
        resType: PetCategoryDetailsResponse,
      },
    });
  }
  static delpet(id: string): Promise<CRUDResult> {
    return fetch({
      url: `/pet/admin/breed/${id}`,
      method: "delete",
      data: {
        resType: CRUDResult,
      },
    });
  }
}
