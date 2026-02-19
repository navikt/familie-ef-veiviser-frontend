import React from 'react';
import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';

export const InfoNyRegelverksendring: React.FC = () => {
  return (
    <Alert variant="info">
      <Heading spacing size="small" level="3">
        Statsbudsjettet for 2026 varsler endring i ytelsene til enslig mor eller far
      </Heading>

      <VStack gap={'space-20'}>
        <BodyShort>
          I vedtatt statsbudsjett for 2026 er det lagt opp til endringer i stønadene til enslig mor
          eller far. Endringene innebærer at overgangsstønad og andre ytelser knyttet til det å være
          enslig mor eller far skal fases ut for hovedgruppen av mottakere.
        </BodyShort>
        <BodyShort>
          Noen grupper skal fortsatt ha rett til overgangsstønad. Det gjelder de som har aleneomsorg
          for barn under 14 måneder eller barn med særlig tilsynsbehov.
        </BodyShort>
        <BodyShort>
          Endringene skal kun gjelde nye saker fra 1. juli 2026. Ingen som mottar stønadene i dag
          vil miste det de allerede er innvilget.
        </BodyShort>
        <BodyShort>
          Stortinget vil behandle og fatte et endelig vedtak om endringene og et mer detaljert
          regelverk i løpet av våren.
        </BodyShort>
        <BodyShort>Vi oppdaterer denne teksten så snart vi vet mer.</BodyShort>
      </VStack>
    </Alert>
  );
};
