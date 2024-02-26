const isProduction = process.env.NODE_ENV === 'production';

const getAppEnvironment = () => {
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

const appEnv = getAppEnvironment();
export default appEnv;
