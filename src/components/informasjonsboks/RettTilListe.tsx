import React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import { Normaltekst } from 'nav-frontend-typografi';

const RettTilListe = () => {
  return (
    <div>
      <h2>Du kan ha rett til</h2>
      <ul>
        <li>
          <span className="liste-med-ikon">
            <Ikon kind="ok-sirkel-fyll" size="1.5em" />
            <Normaltekst className="liste-element">Overgangsstønad</Normaltekst>
          </span>
        </li>
        <li>
          <span className="liste-med-ikon">
            <Ikon kind="ok-sirkel-fyll" size="1.5em" />
            <Normaltekst className="liste-element">
              Stønad til barnetilsyn
            </Normaltekst>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default RettTilListe;
