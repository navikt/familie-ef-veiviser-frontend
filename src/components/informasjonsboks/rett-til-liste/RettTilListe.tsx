import React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import { device } from '../../../utils/styles';

interface IRettTilListeProps {
  tekster_i_liste: string[];
  ikke_rett_til: boolean;
}

export const RettTilListeWrapper = styled.div`
  ul {
    list-style-type: none;

    li {
      padding-bottom: 0;
      padding-right: 2rem;
    }
  }

  ul {
    li:not(:last-child) {
      padding-bottom: 0.5rem;
    }
  }

  padding-left: 6rem;

  @media ${device.mobile} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const ListeMedIkon = styled.span`
  display: inline;

  p {
    position: absolute;
    margin-top: 0.1rem;
  }
`;

export const ListeElement = styled(Normaltekst)`
  display: inline;
  margin-left: 1rem;
  margin-right: 2rem;
`;

const RettTilListe: React.FC<IRettTilListeProps> = ({
  tekster_i_liste,
  ikke_rett_til,
}) => {
  const overskrift = ikke_rett_til
    ? 'Det ser ikke ut til at du har rett til'
    : 'Du kan ha rett til';
  const ikon = ikke_rett_til ? (
    <Ikon kind="feil-sirkel-fyll" size="1.5em" />
  ) : (
    <Ikon kind="ok-sirkel-fyll" size="1.5em" />
  );

  return (
    <RettTilListeWrapper>
      <h2>{overskrift}</h2>
      <ul>
        {tekster_i_liste.map((tekst: string) => (
          <li key={tekst}>
            <ListeMedIkon>
              {ikon}
              <ListeElement>{tekst}</ListeElement>
            </ListeMedIkon>
          </li>
        ))}
      </ul>
    </RettTilListeWrapper>
  );
};

export default RettTilListe;
