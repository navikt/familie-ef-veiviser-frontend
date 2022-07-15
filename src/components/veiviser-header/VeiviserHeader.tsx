import { useEffect, useState } from 'react';
import { client, hentHeaderQuery } from '../../utils/sanity';
import { Loader } from '@navikt/ds-react';
import Feilside from '../feilside/Feilside';
import { IHeader } from '../../models/Header';
import {
  VeiviserHeader,
  StyledVeiviserIkon,
  Overskrift,
  Ingress,
  MikroKortWrapper,
} from './VeiviserHeaderElementer';
import MikroKort from '../mikrokort/MikroKort';
import { logNavigasjon } from '../../utils/amplitude';

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
    return <Loader className="spinner" />;
  }

  if (!feil && info && info.ingress && info.overskrift) {
    return (
      <VeiviserHeader>
        <StyledVeiviserIkon />
        <Overskrift>{info.overskrift}</Overskrift>
        <hr />
        <Ingress markdown={info.ingress} />
        <MikroKortWrapper>
          <h3>Mer om hva du kan ha rett til når du</h3>
          <MikroKort
            href="https://www.nav.no/alene-med-barn"
            onClick={() => {
              logNavigasjon(
                'https://www.nav.no/alene-med-barn',
                'Mer om hva du kan ha rett til når du er helt eller delvis alene med barn',
                'header'
              );
            }}
          >
            Er helt eller delvis alene med barn
          </MikroKort>
        </MikroKortWrapper>
      </VeiviserHeader>
    );
  } else if (feil) {
    return <Feilside />;
  }

  return null;
};

export default Header;
