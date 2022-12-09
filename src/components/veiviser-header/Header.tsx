import { IHeader } from '../../models/Header';
import {
  Ingress,
  MikroKortWrapper,
  Overskrift,
  StyledVeiviserIkon,
  VeiviserHeader,
} from './VeiviserHeaderElementer';
import MikroKort from '../mikrokort/MikroKort';
import { logNavigering } from '../../utils/amplitude';

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
      <hr />
      <Ingress markdown={tekst.ingress} />
      <MikroKortWrapper>
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
      </MikroKortWrapper>
    </VeiviserHeader>
  );
};

export default Header;
