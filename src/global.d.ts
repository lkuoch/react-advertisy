// Make CONFIG globally available
declare var CONFIG: typeof import("@Config");

// Import web worker
declare module "worker-loader!*" {
  const value: Function;
  export = value;
}
