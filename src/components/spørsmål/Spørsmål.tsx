import React, { RefObject, useState } from 'react';
import {
  ISpørsmål,
  ISvar,
  ISvarstiTilInformasjonsboksMapping,
} from '../../models/Spørsmål';
import { BodyShort, Box, Radio, RadioGroup } from '@navikt/ds-react';
import { Informasjonsboks } from '../informasjonsboks/Informasjonsboks';
import {
  besvarteSvar,
  finnInformasjonsboksMedFlestMatchendeSvar,
  finnSpørsmålStiMedBesvarteSvar,
  hoppTilSpørsmål,
  scrollTilNesteSpørsmal,
} from './SpørsmålUtils';
import { MarkdownViewer } from '../utils/markdownviewer/MarkdownViewer';
import { logSpørsmålBesvart } from '../../utils/amplitude';
import styles from './Spørsmål.module.css';

interface ISpørsmålProps {
  steg: number;
  settSteg: (active: number) => void;
  settFerdig: (ferdig: boolean) => void;
  ferdig: boolean;
  spørsmålListe: ISpørsmål[];
  svarstiTilInformasjonsboksMapping: ISvarstiTilInformasjonsboksMapping[];
  startet: boolean;
  nesteSpørsmål: RefObject<HTMLDivElement | null>;
  disclaimer?: string;
  alert?: string;
}

const Spørsmål: React.FC<ISpørsmålProps> = ({
  nesteSpørsmål,
  spørsmålListe,
  steg,
  settSteg,
  settFerdig,
  ferdig,
  svarstiTilInformasjonsboksMapping,
  startet,
  disclaimer,
  alert,
}) => {
  const [spørsmålSti, setSpørsmålSti] = useState<any>([]);

  const detteSpørsmålet = spørsmålListe.find(
    (spørsmål: ISpørsmål) => spørsmål.sporsmal_id === steg
  );

  if (!ferdig && !spørsmålSti.includes(detteSpørsmålet) && startet) {
    spørsmålSti.push(detteSpørsmålet);
  }

  const klikkPåSvar = (
    spørsmål: ISpørsmål,
    svar: ISvar,
    scroll: boolean
  ): void => {
    svar.checked = true;

    logSpørsmålBesvart(spørsmål.sporsmal_tekst, svar.tekst);

    if (svar.done) {
      settFerdig(true);
    } else {
      settFerdig(false);
    }

    hoppTilSpørsmål(spørsmål, spørsmålSti);

    let tempSpørsmålSti = finnSpørsmålStiMedBesvarteSvar(
      spørsmålSti,
      spørsmål,
      svar
    );

    const besvarteSvarMedSpørsmålId = besvarteSvar(tempSpørsmålSti);

    let lengsteMatchId = finnInformasjonsboksMedFlestMatchendeSvar(
      svarstiTilInformasjonsboksMapping,
      besvarteSvarMedSpørsmålId
    );

    setSpørsmålSti(tempSpørsmålSti);

    if (svar.done_complete) {
      settSteg(lengsteMatchId);
    } else {
      settSteg(svar.goto);
    }

    scroll && scrollTilNesteSpørsmal(nesteSpørsmål);
  };

  const museklikk = (xKoordinat: number, yKoordinat: number) =>
    xKoordinat !== 0 && yKoordinat !== 0;

  const valgtVedTastetrykk = (knapp: string) =>
    knapp === 'Space' || knapp === 'Enter';

  return (
    <div>
      {spørsmålSti.map((spørsmål: ISpørsmål, index: number) => {
        return (
          <div className={styles.spørsmålElement} key={spørsmål._id}>
            {index === spørsmålSti.length - 1 && !ferdig ? (
              <div ref={nesteSpørsmål} />
            ) : null}
            <BodyShort
              size="large"
              weight="semibold"
              id={spørsmål.sporsmal_tekst}
            >
              {spørsmål.sporsmal_tekst}
            </BodyShort>

            {spørsmål &&
              spørsmål.hjelpetekst_overskrift &&
              spørsmål.hjelpetekst && (
                <Box padding={'4'}>
                  <MarkdownViewer markdown={spørsmål.hjelpetekst} />
                </Box>
              )}

            <RadioGroup legend={spørsmål.sporsmal_tekst} hideLegend={true}>
              {spørsmål.svarliste.map((svar: ISvar) => {
                return (
                  <div key={svar._id}>
                    <Radio
                      value={svar.tekst}
                      onKeyDown={(e) =>
                        klikkPåSvar(spørsmål, svar, valgtVedTastetrykk(e.code))
                      }
                      onClick={(e) =>
                        museklikk(e.clientX, e.clientY) &&
                        klikkPåSvar(spørsmål, svar, true)
                      }
                    >
                      {svar.tekst}
                    </Radio>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        );
      })}

      {ferdig && (
        <>
          <div ref={nesteSpørsmål} />
          <Informasjonsboks steg={steg} disclaimer={disclaimer} alert={alert} />
        </>
      )}
    </div>
  );
};

export default Spørsmål;
