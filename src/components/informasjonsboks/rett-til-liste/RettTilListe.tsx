import React, { useEffect } from 'react';
import { BodyShort } from '@navikt/ds-react';
import ErrorIkon from '../../../icons/ErrorIkon';
import SuccessIkon from '../../../icons/SuccessIkon';
import { logVeiviserFullført } from '../../../utils/amplitude';
import styles from './RettTilListe.module.css';

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
      <h2>{overskrift}</h2>
      <ul aria-label={listeLabel} className={styles.rettTilListe}>
        {tekster_i_liste.map((tekst: string) => (
          <li key={tekst}>
            <span className={styles.grid}>
              {ikon}
              <BodyShort>{tekst}</BodyShort>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RettTilListe;
