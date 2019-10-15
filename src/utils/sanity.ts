const sanityClient = require('@sanity/client');

export const client = sanityClient({
  projectId: '8wpntadz',
  dataset: 'questions',
  useCdn: true,
});
