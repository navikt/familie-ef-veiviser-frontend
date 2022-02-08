import React, { useState, SyntheticEvent, RefObject } from 'react';
import {
  ISvarstiTilInformasjonsboksMapping,
  ISpørsmål,
  ISvar,
} from '../../models/Spørsmål';
import { Radio, RadioGroup } from '@navikt/ds-react';
import Informasjonsboks from '../informasjonsboks/Informasjonsboks';
import { scrollTilNesteSpørsmal } from './SpørsmålUtils';
import MarkdownViewer from '../utils/MarkdownViewer';
import {
  hoppTilSpørsmål,
  finnSpørsmålStiMedBesvarteSvar,
  besvarteSvar,
  finnInformasjonsboksMedFlestMatchendeSvar,
} from './SpørsmålUtils';
import {
  SpørsmålElement,
  Spørsmålstekst,
  Hjelpetekst,
  RadioknappWrapper,
} from './SpørsmålElementer';

interface ISpørsmålProps {
  steg: number;
  settSteg: (active: number) => void;
  settFerdig: (ferdig: boolean) => void;
  ferdig: boolean;
  spørsmålListe: ISpørsmål[];
  svarstiTilInformasjonsboksMapping: ISvarstiTilInformasjonsboksMapping[];
  startet: boolean;
  nesteSpørsmål: RefObject<HTMLDivElement>;
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

  const KlikkPåSvar = (
    e: SyntheticEvent<EventTarget>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    svar.checked = true;

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

    scrollTilNesteSpørsmal(nesteSpørsmål);
  };

  return (
    <div>
      {spørsmålSti.map((spørsmål: ISpørsmål, index: number) => {
        return (
          <SpørsmålElement key={spørsmål._id}>
            {index === spørsmålSti.length - 1 && !ferdig ? (
              <div ref={nesteSpørsmål} />
            ) : null}
            <Spørsmålstekst>{spørsmål.sporsmal_tekst}</Spørsmålstekst>
            {spørsmål &&
            spørsmål.hjelpetekst_overskrift &&
            spørsmål.hjelpetekst ? (
              <Hjelpetekst apneTekst={spørsmål.hjelpetekst_overskrift}>
                <MarkdownViewer markdown={spørsmål.hjelpetekst} />
              </Hjelpetekst>
            ) : null}
            <RadioGroup legend="">
              {spørsmål.svarliste.map((svar: ISvar) => {
                let c = svar.checked ? svar.checked : false;

                if (index === spørsmålSti.length - 1 && !ferdig) c = false;

                return (
                  <RadioknappWrapper key={svar._id}>
                    <Radio
                      id={spørsmål.sporsmal_tekst + ' ' + svar.tekst}
                      value={svar.tekst}
                      name={spørsmål._id}
                      checked={c}
                      onChange={(e) => KlikkPåSvar(e, spørsmål, svar)}
                    >
                      {svar.tekst}
                    </Radio>
                  </RadioknappWrapper>
                );
              })}
            </RadioGroup>
          </SpørsmålElement>
        );
      })}
      {ferdig ? (
        <>
          <div ref={nesteSpørsmål} />
          <Informasjonsboks steg={steg} disclaimer={disclaimer} alert={alert} />
        </>
      ) : null}
    </div>
  );
};

export default Spørsmål;
