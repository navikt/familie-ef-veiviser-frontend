import { IHeader } from '../../models/Header';
import {
  Ingress,
  Overskrift,
  StyledVeiviserIkon,
  VeiviserHeader,
} from './VeiviserHeaderElementer';
import { MikroKort } from '../mikrokort/MikroKort';
import { logNavigering } from '../../utils/amplitude';
import { VStack } from '@navikt/ds-react';

interface IProps {
  tekst: IHeader;
}

const Header: React.FC<IProps> = ({ tekst }) => {
  const skalViseKomponent = tekst && tekst.ingress && tekst.overskrift;

  if (!skalViseKomponent) {
    return <></>;
  }

  return (
    <VeiviserHeader>
      <StyledVeiviserIkon />
      <Overskrift>{tekst.overskrift}</Overskrift>
      <hr aria-hidden={true} />
      <Ingress markdown={tekst.ingress} />
      <VStack gap={'2'}>
        <h3 id={'mikrokort_tittel'}>Mer om hva du kan ha rett til når du</h3>
        <MikroKort
          href="https://www.nav.no/alene-med-barn"
          onClick={() => {
            logNavigering(
              'https://www.nav.no/alene-med-barn',
              'Mer om hva du kan ha rett til når du er helt eller delvis alene med barn',
              'header'
            );
          }}
        >
          Er helt eller delvis alene med barn
        </MikroKort>
      </VStack>
    </VeiviserHeader>
  );
};

export default Header;
