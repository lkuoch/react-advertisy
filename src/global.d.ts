// Make CONFIG globally available
declare var CONFIG: ReturnType<typeof import("src/Config").default>;

// Middleware action result
declare type IMiddlewareActionResult =
  | import("redux-api-middleware").RSAASuccessTypeDescriptor
  | import("redux-api-middleware").RSAAFailureTypeDescriptor;
