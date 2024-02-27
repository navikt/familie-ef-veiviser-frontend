const isProduction = window.location.href.includes('www.nav.no');

type SanityConfig = { dataset: string; projectId: string };
type Environment = { env: string; sanityConfig: SanityConfig };

const getEnvironment = (): Environment => {
  if (isProduction) {
    return {
      env: 'prod',
      sanityConfig: {
        dataset: 'prod-v2023',
        projectId: '8wpntadz',
      },
    };
  }
  return {
    env: 'dev',
    sanityConfig: {
      dataset: 'test',
      projectId: '8wpntadz',
    },
  };
};

const appEnv = getEnvironment();
export default appEnv;
