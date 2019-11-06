import React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import { Normaltekst } from 'nav-frontend-typografi';

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
    <div className={ikke_rett_til ? 'rett-til-liste' : 'ikke-rett-til-liste'}>
      <h2>{overskrift}</h2>
      <ul>
        {tekster_i_liste.map((tekst: string) => (
          <li key={tekst}>
            <span className="liste-med-ikon">
              {ikon}
              <Normaltekst className="liste-element">{tekst}</Normaltekst>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RettTilListe;
