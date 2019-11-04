import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import NavFrontendSpinner from 'nav-frontend-spinner';
import RettTilListe from './RettTilListe';
import { IInformasjonsboks, IUndertittel } from '../../models/Informasjonsboks';
import UndertitlerPanel from './UndertitlerPanel';
import BallIkon from '../../assets/icons/BallIkon';
import BamseIkon from '../../assets/icons/BamseIkon';
import BordIkon from '../../assets/icons/BordIkon';
import BarnIkon from '../../assets/icons/BarnIkon';
import Barn2Ikon from '../../assets/icons/Barn2Ikon';
import BrodskiveIkon from '../../assets/icons/BrodskiveIkon';
import TaateflaskeIkon from '../../assets/icons/TaateflaskeIkon';
import Feilside from '../feilside/Feilside';

interface IInformasjonstekstProps {
  steg: number;
}

const Informasjonsboks: React.FC<IInformasjonstekstProps> = ({ steg }) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [info, setInfo] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  const sanityQuery =
    '*[_type == $type && information_id == $id][0]{information_id, undertitler[]->{tekst_i_liste, tekst_i_panel, knapp, ikke_rett_til, brodtekster[]->{body}}}';

  const veiledende =
    'PS! Veiviseren gir bare et veiledende svar. Hvis du søker vil vi vurdere flere aspekter ved situasjonen din, og svaret på søknaden kan være annerledes enn svaret du får i veiviseren.';

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(sanityQuery, {
          type: 'informasjonsboks',
          id: steg,
        })
        .then((res: IInformasjonsboks) => {
          setInfo(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });

      setFetching(false);
    };

    fetchData();
  }, [steg]);

  if (fetching || !(info && info.undertitler)) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (error) {
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
        (typeof undertittel.ikke_rett_til === 'boolean' &&
          undertittel.ikke_rett_til)
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

  const andre_stonader = info.undertitler.filter(
    (undertittel: IUndertittel) =>
      undertittel.tekst_i_panel ===
      'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn'
  );

  console.log(rett_til_liste);

  console.log(rett_til_undertitler);

  console.log(ikke_rett_til_liste);

  console.log('ikke rett til undertitler');
  console.log(ikke_rett_til_undertitler);

  return (
    <div className="informasjonsboks blur-in">
      <div className="informasjonsboks-header">
        <BallIkon className="ball-ikon" />
        <BamseIkon className="bamse-ikon" />
        <BarnIkon className="barn-ikon" />
        <Barn2Ikon className="barn2-ikon" />
        <BordIkon className="bord-ikon" />
        <BrodskiveIkon className="brodskive-ikon" />
        <TaateflaskeIkon className="taateflaske-ikon" />
      </div>
      <div className="informasjonsboks-innhold">
        {rett_til_liste.length ? (
          <RettTilListe
            tekster_i_liste={rett_til_liste}
            ikke_rett_til={false}
          />
        ) : null}
        <UndertitlerPanel
          undertitler={rett_til_undertitler}
          antall_undertitler_totalt={info.undertitler.length}
        />
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
        <div className="bare-brodtekst">
          <i>{veiledende}</i>
        </div>
        <hr />
        <UndertitlerPanel undertitler={andre_stonader} />
      </div>
    </div>
  );
};

export default Informasjonsboks;
