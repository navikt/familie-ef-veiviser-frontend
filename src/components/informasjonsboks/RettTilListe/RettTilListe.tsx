import React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import {
  StyledRettTilListe,
  ListeMedIkon,
  ListeElement,
} from './RettTilListeElementer';

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
    <Ikon kind="feil-sirkel-fyll" size="1.5em" />
  ) : (
    <Ikon kind="ok-sirkel-fyll" size="1.5em" />
  );

  return (
    <StyledRettTilListe>
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
    </StyledRettTilListe>
  );
};

export default RettTilListe;
