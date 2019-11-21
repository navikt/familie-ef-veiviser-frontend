const sanityClient = require('@sanity/client');

export const client = sanityClient({
  projectId: '8wpntadz',
  dataset: 'questions',
  useCdn: true,
});

export const hentHeaderQuery = '*[_type == $type][0]{ingress, overskrift}';

export const hentInformasjonsboksQuery = `*[_type == $type && information_id == $id][0]{information_id, undertitler[]->{
      tekst_i_liste, 
      tekst_i_panel, 
      knapp, 
      ikke_rett_til, 
      "brodtekster": brodtekster[]->{body}
      }}`;
