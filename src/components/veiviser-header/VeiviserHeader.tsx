import React, { useEffect, useState } from 'react';
import { client, hentHeaderQuery } from '../../utils/sanity';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from '../feilside/Feilside';
import { IHeader } from '../../models/Header';
import {
  VeiviserHeader,
  StyledVeiviserIkon,
  Overskrift,
  Ingress,
} from './VeiviserHeaderElementer';

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
      <VeiviserHeader>
        <StyledVeiviserIkon />
        <Overskrift>{info.overskrift}</Overskrift>
        <hr />
        <Ingress markdown={info.ingress} />
      </VeiviserHeader>
    );
  } else if (feil) {
    return <Feilside />;
  }

  return null;
};

export default Header;
