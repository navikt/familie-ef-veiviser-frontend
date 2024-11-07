import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('default', undefined, {
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

export const logSideBesøk = () => {
  amplitude.track('EF Veiviser - sidevisning', {
    sidetittel: document.title,
    platform: window.location.toString(),
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
