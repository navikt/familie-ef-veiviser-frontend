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
import MarkdownViewer from '../utils/MarkdownViewer';
import { hentInformasjonsboksQuery } from '../../utils/sanity';

interface IInformasjonstekstProps {
  steg: number;
  disclaimer?: string;
}

const Informasjonsboks: React.FC<IInformasjonstekstProps> = ({
  steg,
  disclaimer,
}) => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [info, setInfo] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(hentInformasjonsboksQuery, {
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
    // eslint-disable-next-line
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
    <div className="informasjonsboks blur-in" id={`informasjonsboks-${steg}`}>
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
        {disclaimer ? (
          <div className="disclaimer">
            <MarkdownViewer markdown={disclaimer} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Informasjonsboks;
