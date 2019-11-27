import React, { useEffect, useState } from 'react';
import { client, hentHeaderQuery } from '../../utils/sanity';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from '../feilside/Feilside';
import MarkdownViewer from '../utils/MarkdownViewer';
import Veiviserikon from '../../assets/icons/VeiviserIkon';
import { IHeader } from '../../models/Header';

const Header = () => {
  const [henter, settHenter] = useState<boolean>(true);
  const [info, settInfo] = useState<any>([]);
  const [feil, settFeil] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      client
        .fetch(hentHeaderQuery, { type: 'header' })
        .then((res: IHeader) => {
          settInfo(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });

      settHenter(false);
    };

    fetchData();
  }, []);

  if (henter) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (!feil && info && info.ingress && info.overskrift) {
    return (
      <div className="veiviser-header">
        <Veiviserikon className="veiviser-ikon" />
        <h2>{info.overskrift}</h2>
        <hr />
        <MarkdownViewer markdown={info.ingress} />
      </div>
    );
  } else if (feil) {
    return <Feilside />;
  }

  return null;
};

export default Header;
