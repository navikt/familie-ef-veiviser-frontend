import React from 'react';
import styled from 'styled-components';
import { BodyShort } from '@navikt/ds-react';
import { device } from '../../../utils/styles';
import { ErrorColored, SuccessColored } from '@navikt/ds-icons';

interface IRettTilListeProps {
  tekster_i_liste: string[];
  ikke_rett_til: boolean;
}

const RettTilListeWrapper = styled.div`
  ul {
    list-style-type: none;

    li {
      padding-bottom: 0;
    }

    li:not(:last-child) {
      padding-bottom: 1rem;
    }
  }

  padding-left: 6rem;

  @media ${device.mobile} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Grid = styled.span`
  display: inline-grid;
  grid-template-columns: 1.75rem auto;
  align-items: center;
  column-gap: 1rem;
`;

const ListeElement = styled(BodyShort)`
  display: inline;
`;

const RettTilListe: React.FC<IRettTilListeProps> = ({
  tekster_i_liste,
  ikke_rett_til,
}) => {
  const overskrift = ikke_rett_til
    ? 'Det ser ikke ut til at du har rett til'
    : 'Du kan ha rett til';
  const ikon = ikke_rett_til ? (
    <ErrorColored
      aria-hidden={true}
      title={'det ser ikke ut til at du har rett til'}
      width={'1.75rem'}
      height={'1.75rem'}
    />
  ) : (
    <SuccessColored
      aria-hidden={true}
      title={'du kan ha rett til'}
      width={'1.75rem'}
      height={'1.75rem'}
    />
  );
  const listeLabel = ikke_rett_til
    ? 'Det ser ikke ut til at du har rett til'
    : 'Du kan ha rett til';

  return (
    <RettTilListeWrapper>
      <h2>{overskrift}</h2>
      <ul aria-label={listeLabel}>
        {tekster_i_liste.map((tekst: string) => (
          <li key={tekst}>
            <Grid>
              {ikon}
              <ListeElement>{tekst}</ListeElement>
            </Grid>
          </li>
        ))}
      </ul>
    </RettTilListeWrapper>
  );
};

export default RettTilListe;
