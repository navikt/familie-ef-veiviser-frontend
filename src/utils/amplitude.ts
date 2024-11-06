import * as amplitude from '@amplitude/analytics-browser';
import { userAgentEnrichmentPlugin } from '@amplitude/plugin-user-agent-enrichment-browser';

const uaPlugin = userAgentEnrichmentPlugin({
  osName: true,
  osVersion: true,
  deviceManufacturer: false,
  deviceModel: false,
});

amplitude.add(uaPlugin);

amplitude.init('default', undefined, {
  autocapture: {
    attribution: true,
    pageViews: true,
    sessions: false,
    elementInteractions: false,
  },
  defaultTracking: {
    pageViews: {
      trackOn: 'attribution',
    },
  },
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
  logEventVeiviser('skjema fullført', {
    rett_til,
    ikke_rett_til,
  });
};
