// Make RootState type global
type RootState = ReturnType<typeof import("index").store.getState>;

// Make CONFIG variable global
declare var CONFIG: ReturnType<typeof import("config").default>;
