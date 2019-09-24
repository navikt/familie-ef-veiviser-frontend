import React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import { Normaltekst } from 'nav-frontend-typografi';

interface IRettTilListeProps {
  tekster_i_liste: string[];
}

const RettTilListe: React.FC<IRettTilListeProps> = ({ tekster_i_liste }) => {
  return (
    <div>
      <h2>Du kan ha rett til</h2>
      <ul>
        {tekster_i_liste.map((tekst: string) => (
          <li key={tekst}>
            <span className="liste-med-ikon">
              <Ikon kind="ok-sirkel-fyll" size="1.5em" />
              <Normaltekst className="liste-element">{tekst}</Normaltekst>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RettTilListe;
