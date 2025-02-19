import { getAmplitudeInstance } from '@navikt/nav-dekoratoren-moduler';

const logger = getAmplitudeInstance('dekoratoren');

const logEvent = (eventName: string, eventProperties: any) => {
  logger(eventName, eventProperties);
};

const logEventVeiviser = (eventName: string, eventProperties?: any) => {
  logEvent(eventName, {
    team_id: 'familie',
    applikasjon: 'ef-veiviser',
    ...eventProperties,
  });
};

export const logStartVeiviser = () => {
  logEventVeiviser('skjema startet');
};

export const logNavigering = (
  destinasjon: string,
  lenketekst: string,
  kilde?: string
) => {
  logEventVeiviser('navigere', {
    destinasjon: destinasjon,
    lenketekst: lenketekst,
    kilde: kilde,
  });
};

export const logSpørsmålBesvart = (spørsmål: string, svar: string) => {
  logEventVeiviser('spørsmål besvart', {
    spørsmål: spørsmål,
    svar: svar,
  });
};

export const logVeiviserFullført = (
  rett_til?: string[],
  ikke_rett_til?: string[]
) => {
  logEventVeiviser('EF Veiviser - skjema fullført', {
    rett_til,
    ikke_rett_til,
  });
};
