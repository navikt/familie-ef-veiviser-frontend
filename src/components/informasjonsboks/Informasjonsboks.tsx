import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import NavFrontendSpinner from 'nav-frontend-spinner';
import RettTilListe from './RettTilListe';
import { IUndertittel } from '../../models/Informasjonsboks';

interface IInformasjonstekstProps {
  steg: number;
}

const Informasjonsboks: React.FC<IInformasjonstekstProps> = ({ steg }) => {
  const [fetching, settFetching] = useState<boolean>(true);
  const [info, settInfo] = useState<any>([]);
  const [error, settError] = useState<boolean>(false);

  const sanityQuery =
    '*[_type == $type && information_id == $id][0]{information_id, undertitler[]->{tekst_i_liste, tekst_i_panel, brodtekster[]->{body}}}';

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(sanityQuery, {
          type: 'informasjonsboks',
          id: steg,
        })
        .then((res: any) => {
          settInfo(res);
        })
        .catch((err: any) => {
          console.error('Oh no, error occured: ', err);
          settError(true);
        });

      settFetching(false);
    };

    fetchData();
  }, []);

  if (fetching) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (info && info.undertitler) {
    const tekster_i_liste = info.undertitler.reduce(
      (tekster: string[], undertittel: IUndertittel) => {
        if (undertittel.tekst_i_liste) tekster.push(undertittel.tekst_i_liste);
        return tekster;
      },
      []
    );

    return (
      <>
        <div className="informasjonsboks blur-in">
          <RettTilListe tekster_i_liste={tekster_i_liste} />
        </div>
      </>
    );
  }

  return null;
};

export default Informasjonsboks;
