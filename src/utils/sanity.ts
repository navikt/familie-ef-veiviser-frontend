import { createClient } from '@sanity/client';

export const client = createClient({
  dataset: 'prod-v2023',
  projectId: '8wpntadz',
  useCdn: true,
  apiVersion: '2024-09-23',
});

export const hentHeaderQuery = '*[_type == $type][0]{ingress, overskrift}';

export const hentInformasjonsboksQuery = `*[_type == $type && information_id == $id][0]{information_id, undertitler[]->{
      tekst_i_liste, 
      tekst_i_panel, 
      knapp, 
      ikke_rett_til, 
      "brodtekster": brodtekster[]->{body}
      }}`;

export const hentSpørsmålQuery =
  '*[_type == $type]{' +
  'sporsmal_id,' +
  'sporsmal_tekst,' +
  'hjelpetekst_overskrift,' +
  'hjelpetekst,' +
  'svarliste[]->, _createdAt, _id, _rev, _type, _updatedAt}';

export const svarstiTilInformasjonsboksQuery =
  '*[_type == $type]{information_id, svarsti[]->{_id, tekst}}';
