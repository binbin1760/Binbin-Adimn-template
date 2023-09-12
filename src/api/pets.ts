import fetch from "@/utils/request";
import {
  AddPetBreedRequest,
  CRUDResult,
  PetBreedPageResponse,
  PagerRequest,
} from "@/protoJs";

export class pets {
  static addPet(request: AddPetBreedRequest): Promise<CRUDResult> {
    return fetch({
      url: "/pet/admin/breed",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: CRUDResult,
      },
    });
  }
  static classificationPet(
    request: PagerRequest
  ): Promise<PetBreedPageResponse> {
    return fetch({
      url: "/pet/breed/all",
      method: "post",
      data: {
        request: request.serializeBinary(),
        resType: PetBreedPageResponse,
      },
    });
  }
}
