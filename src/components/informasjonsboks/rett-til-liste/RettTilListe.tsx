import React, { useEffect } from 'react';
import { Heading, HStack, List, VStack } from '@navikt/ds-react';
import ErrorIkon from '../../../icons/ErrorIkon';
import SuccessIkon from '../../../icons/SuccessIkon';
import { logVeiviserFullført } from '../../../utils/amplitude';

interface IRettTilListeProps {
  tekster_i_liste: string[];
  ikke_rett_til: boolean;
}

const RettTilListe: React.FC<IRettTilListeProps> = ({
  tekster_i_liste,
  ikke_rett_til,
}) => {
  const overskrift = ikke_rett_til
    ? 'Det ser ikke ut til at du har rett til'
    : 'Du kan ha rett til';

  const ikon = ikke_rett_til ? (
    <ErrorIkon title={'det ser ikke ut til at du har rett til'} />
  ) : (
    <SuccessIkon title={'du kan ha rett til'} />
  );

  const listeLabel = ikke_rett_til
    ? 'Det ser ikke ut til at du har rett til'
    : 'Du kan ha rett til';

  useEffect(() => {
    if (ikke_rett_til) {
      logVeiviserFullført(tekster_i_liste, undefined);
    }
    if (!ikke_rett_til) {
      logVeiviserFullført(undefined, tekster_i_liste);
    }
  });

  return (
    <div>
      <HStack gap={'2'}>
        {ikon}
        <Heading size="medium" level="3">
          {overskrift}
        </Heading>
      </HStack>

      <List as="ul" aria-label={listeLabel} size="large">
        {tekster_i_liste.map((tekst: string) => (
          <List.Item key={tekst}>{tekst}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default RettTilListe;
