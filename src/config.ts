const config = (isProd: boolean) => ({
  isProd,

  features: {},

  vars: {
    base_graphql_endpoint: "https://lkuoch.com",
    selector_options: {
      memoizeOptions: {
        maxSize: 256,
      },
    },
  },
});

export default config;
