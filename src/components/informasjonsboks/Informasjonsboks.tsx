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
    '*[_type == $type && information_id == $id][0]{information_id, undertitler[]->{tekst_i_liste, tekst_i_panel, knapp, brodtekster[]->{body}}}';

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

  const tekster_i_liste = info.undertitler.reduce(
    (tekster: string[], undertittel: IUndertittel) => {
      if (undertittel.tekst_i_liste) tekster.push(undertittel.tekst_i_liste);
      return tekster;
    },
    []
  );

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
        {tekster_i_liste.length ? (
          <RettTilListe tekster_i_liste={tekster_i_liste} />
        ) : null}
        <UndertitlerPanel undertitler={info.undertitler} />
      </div>
    </div>
  );
};

export default Informasjonsboks;
