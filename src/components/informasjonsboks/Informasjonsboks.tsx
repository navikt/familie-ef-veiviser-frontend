import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import { Loader, VStack } from '@navikt/ds-react';
import RettTilListe from './rett-til-liste/RettTilListe';
import { IInformasjonsboks, IUndertittel } from '../../models/Informasjonsboks';
import UndertitlerPanel from './UndertitlerPanel';
import BallIkon from '../../icons/BallIkon';
import BamseIkon from '../../icons/BamseIkon';
import BordIkon from '../../icons/BordIkon';
import BarnIkon from '../../icons/BarnIkon';
import Barn2Ikon from '../../icons/Barn2Ikon';
import BrodskiveIkon from '../../icons/BrodskiveIkon';
import TaateflaskeIkon from '../../icons/TaateflaskeIkon';
import Feilside from '../feilside/Feilside';
import { hentInformasjonsboksQuery } from '../../utils/sanity';
import { StyledAlertstripeAdvarsel } from './InformasjonsboksElementer';
import { MikroKort } from '../mikrokort/MikroKort';
import { logNavigering } from '../../utils/amplitude';
import { Disclaimer } from './Disclaimer';
import styles from './Informasjonsboks.module.css';
interface IInformasjonstekstProps {
  steg: number;
  disclaimer?: string;
  alert?: string;
}

const Informasjonsboks: React.FC<IInformasjonstekstProps> = ({
  steg,
  disclaimer,
  alert,
}) => {
  const [henter, settHenter] = useState<boolean>(true);
  const [info, settInfo] = useState<any>([]);
  const [feil, settFeil] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(hentInformasjonsboksQuery, {
          type: 'informasjonsboks',
          id: steg,
        })
        .then((res: IInformasjonsboks) => {
          settInfo(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });

      settHenter(false);
    };

    fetchData();
    // eslint-disable-next-line
  }, [steg]);

  if (henter || !(info && info.undertitler)) {
    return <Loader className={styles.spinner} />;
  }

  if (feil) {
    return <Feilside />;
  }

  const rett_til_liste = info.undertitler.reduce(
    (tekster: string[], undertittel: IUndertittel) => {
      if (undertittel.tekst_i_liste && !undertittel.ikke_rett_til)
        tekster.push(undertittel.tekst_i_liste);
      return tekster;
    },
    []
  );

  const ikke_rett_til_liste = info.undertitler.reduce(
    (tekster: string[], undertittel: IUndertittel) => {
      if (
        undertittel.tekst_i_liste &&
        typeof undertittel.ikke_rett_til === 'boolean' &&
        undertittel.ikke_rett_til
      )
        tekster.push(undertittel.tekst_i_liste);
      return tekster;
    },
    []
  );

  const rett_til_undertitler = info.undertitler.filter(
    (undertittel: IUndertittel) =>
      !undertittel.ikke_rett_til &&
      (undertittel.tekst_i_panel || undertittel.brodtekster) &&
      !(
        undertittel.tekst_i_panel ===
        'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn'
      )
  );

  const ikke_rett_til_undertitler = info.undertitler.filter(
    (undertittel: IUndertittel) =>
      typeof undertittel.ikke_rett_til === 'boolean' &&
      undertittel.ikke_rett_til &&
      !(
        undertittel.tekst_i_panel ===
        'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn'
      )
  );

  return (
    <>
      {alert && (
        <StyledAlertstripeAdvarsel variant="warning">
          {alert}
        </StyledAlertstripeAdvarsel>
      )}

      <div
        className={`${styles.informasjonsboksContainer} ${styles.blurIn}`}
        id={`informasjonsboks-${steg}`}
      >
        <div className={styles.informasjonsboksHeader}>
          <BallIkon className={styles.ballIkon} />
          <BamseIkon className={styles.bamseIkon} />
          <BarnIkon className={styles.barnIkon} />
          <Barn2Ikon className={styles.barn2Ikon} />
          <BordIkon className={styles.bordIkon} />
          <BrodskiveIkon className={styles.brodskiveIkon} />
          <TaateflaskeIkon className={styles.taateflaskeIkon} />
        </div>
        <VStack
          gap={{ xs: '2', md: '12' }}
          style={{
            padding: '0 6rem 1rem 6rem',
          }}
        >
          {rett_til_liste.length ? (
            <RettTilListe
              tekster_i_liste={rett_til_liste}
              ikke_rett_til={false}
            />
          ) : null}

          <UndertitlerPanel undertitler={rett_til_undertitler} />

          {ikke_rett_til_liste.length ? (
            <RettTilListe
              tekster_i_liste={ikke_rett_til_liste}
              ikke_rett_til={true}
            />
          ) : null}

          <UndertitlerPanel
            undertitler={ikke_rett_til_undertitler}
            antall_undertitler_totalt={info.undertitler.length}
          />

          {disclaimer && <Disclaimer tekst={disclaimer} />}

          <div>
            <h3>Les mer om hva du kan ha rett til når du</h3>
            <MikroKort
              href="https://www.nav.no/alene-med-barn"
              onClick={() => {
                logNavigering(
                  'https://www.nav.no/alene-med-barn',
                  'Mer om hva du kan ha rett til når du er helt eller delvis alene med barn',
                  'informasjonsboks'
                );
              }}
            >
              Er helt eller delvis alene med barn
            </MikroKort>
          </div>
        </VStack>
      </div>
    </>
  );
};

export default Informasjonsboks;
