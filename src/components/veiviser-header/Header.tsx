import { IHeader } from '../../models/Header';
import { MikroKort } from '../mikrokort/MikroKort';
import { logNavigering } from '../../utils/amplitude';
import { Heading, VStack } from '@navikt/ds-react';
import VeiviserIkon from '../../icons/VeiviserIkon';
import styles from './Header.module.css';
import { MarkdownViewer } from '../utils/markdownviewer/MarkdownViewer';

interface IProps {
  tekst: IHeader;
}

export const Header: React.FC<IProps> = ({ tekst }) => {
  const skalViseKomponent = tekst && tekst.ingress && tekst.overskrift;

  if (!skalViseKomponent) {
    return <></>;
  }

  return (
    <div className={styles.veiviserHeader}>
      <VeiviserIkon className={styles.veiviserIkon} />
      <Heading size="large" level="1" align="center">
        {tekst.overskrift}
      </Heading>
      <hr aria-hidden={true} />
      <MarkdownViewer markdown={tekst.ingress} />
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
    </div>
  );
};
