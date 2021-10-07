import { Data } from "@angular/router";
import { ResponseModel } from "./responseModel";

export interface SingleResponseModel<T> extends ResponseModel {
  data: T;
}
