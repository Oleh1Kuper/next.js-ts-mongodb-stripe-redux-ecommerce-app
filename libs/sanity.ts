import SanityClient from 'next-sanity-client';

const client = new SanityClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
});

export default client;
