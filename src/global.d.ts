// Make CONFIG globally available
declare var CONFIG: typeof import("@Config");

// Import web worker
declare module "worker-loader!*" {
  const value: Function;
  export = value;
}

/// Global types

// Middleware action result
declare type IMiddlewareActionResult =
  | import("redux-api-middleware").RSAASuccessTypeDescriptor
  | import("redux-api-middleware").RSAAFailureTypeDescriptor;

// Store root state
declare type IRootState = ReturnType<typeof import("@Store/redux").rootReducer>;
