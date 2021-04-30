import { ResponseModel } from "./responseModel";

export interface SingelResponseModel<T> extends ResponseModel{
    data:T;
}