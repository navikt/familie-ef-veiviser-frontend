import React from 'react';
import { BodyLong } from '@navikt/ds-react';

export const Disclaimer = ({ tekst }: { tekst: string }) => {
  return (
    <div>
      <BodyLong>{tekst}</BodyLong>
    </div>
  );
};
