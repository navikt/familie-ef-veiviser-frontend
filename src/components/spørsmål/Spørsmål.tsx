import React, { RefObject, useState } from 'react';
import {
  ISpørsmål,
  ISvar,
  ISvarstiTilInformasjonsboksMapping,
} from '../../models/Spørsmål';
import { Box, Radio, RadioGroup } from '@navikt/ds-react';
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
  førsteSpørsmål: RefObject<HTMLFieldSetElement | null>;
  disclaimer?: string;
  alert?: string;
}

const Spørsmål: React.FC<ISpørsmålProps> = ({
  nesteSpørsmål,
  førsteSpørsmål,
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

  return (
    <div>
      {spørsmålSti.map((spørsmål: ISpørsmål, index: number) => {
        return (
          <div className={styles.spørsmålElement} key={spørsmål._id}>
            {index === spørsmålSti.length - 1 && !ferdig ? (
              <div ref={nesteSpørsmål} />
            ) : null}

            {spørsmål &&
              spørsmål.hjelpetekst_overskrift &&
              spørsmål.hjelpetekst && (
                <Box padding={'4'}>
                  <MarkdownViewer markdown={spørsmål.hjelpetekst} />
                </Box>
              )}

            <RadioGroup
              legend={spørsmål.sporsmal_tekst}
              ref={index === 0 ? førsteSpørsmål : null}
              tabIndex={index === 0 ? -1 : undefined}
              value={spørsmål.svarliste.find((s) => s.checked)?.tekst}
              onChange={(val: string) => {
                const svar = spørsmål.svarliste.find((s) => s.tekst === val);
                if (svar) {
                  klikkPåSvar(spørsmål, svar, true);
                }
              }}
            >
              {spørsmål.svarliste.map((svar: ISvar) => {
                return (
                  <Radio key={svar._id} value={svar.tekst}>
                    {svar.tekst}
                  </Radio>
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
