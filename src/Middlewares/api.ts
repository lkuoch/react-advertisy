import {
  RSAAFailureTypeDescriptor,
  RSAASuccessTypeDescriptor,
} from "redux-api-middleware";

declare global {
  type IMiddlewareActionResult =
    | RSAASuccessTypeDescriptor
    | RSAAFailureTypeDescriptor;
}

export const ApiResult = (name: String, id?: String) => ({
  REQUEST: `@REQUEST/${name}${id != null ? "/" + id : ""}`,
  SUCCESS: `@SUCCESS/${name}${id != null ? "/" + id : ""}`,
  FAILURE: `@FAILURE/${name}${id != null ? "/" + id : ""}`,
});
