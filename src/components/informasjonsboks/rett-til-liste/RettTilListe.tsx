import React from 'react';
import { Heading, HStack, List, VStack } from '@navikt/ds-react';
import ErrorIkon from '../../../icons/ErrorIkon';
import SuccessIkon from '../../../icons/SuccessIkon';

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

  return (
    <div>
      <HStack gap={'space-4'}>
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
