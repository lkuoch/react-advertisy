const config = ({ isProd, baseUrl }: { isProd: boolean; baseUrl: string }) => ({
  isProd,

  features: {},

  vars: {
    baseEndpoint: baseUrl,
    gqlEndpoint: `${baseUrl}/graphql`,
  },
});

export default config;
