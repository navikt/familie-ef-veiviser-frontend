import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY_PROD = '10798841ebeba333b8ece6c046322d76';

const getApiKey = () => {
  if (!window.location.href.includes('.dev.nav.no')) {
    return AMPLITUDE_API_KEY_PROD;
  }
  return 'default';
};

amplitude.init(getApiKey(), undefined, {
  serverUrl: 'https://amplitude.nav.no/collect-auto',
  autocapture: true,
});

function logEvent(eventType: string, eventProperties: any) {
  amplitude.track(eventType, eventProperties);
}

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
  amplitude.track('EF Veiviser - skjema fullført', {
    rett_til,
    ikke_rett_til,
  });
};
