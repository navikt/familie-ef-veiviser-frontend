import React, { useState, SyntheticEvent, RefObject } from 'react';
import {
  ISvarstiTilInformasjonsboksMapping,
  ISpørsmål,
  ISvar,
} from '../../models/Spørsmål';
import { RadioPanel } from 'nav-frontend-skjema';
import Informasjonsboks from '../informasjonsboks/Informasjonsboks';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { scrollTilNesteSpørsmal } from './SpørsmålUtils';
import MarkdownViewer from '../utils/MarkdownViewer';
import { hoppTilSpørsmål, finnSpørsmålStiMedBesvarteSvar, besvarteSvar, finnInformasjonsboksMedFlestMatchendeSvar } from './SpørsmålUtils';

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

    setSpørsmålSti(finnSpørsmålStiMedBesvarteSvar(spørsmålSti, spørsmål, svar));
    const besvarteSvarIDer = besvarteSvar(spørsmålSti);
    let lengsteMatchId = finnInformasjonsboksMedFlestMatchendeSvar(svarstiTilInformasjonsboksMapping, besvarteSvarIDer);


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
          <div key={spørsmål._id} className="spørsmål-element">
            {index === spørsmålSti.length - 1 && !ferdig ? (
              <div ref={nesteSpørsmål} />
            ) : null}
            <span className="spørsmål-tekst">{spørsmål.sporsmal_tekst}</span>
            {spørsmål &&
            spørsmål.hjelpetekst_overskrift &&
            spørsmål.hjelpetekst ? (
              <Lesmerpanel
                className="hjelpetekst"
                apneTekst={spørsmål.hjelpetekst_overskrift}
              >
                <MarkdownViewer markdown={spørsmål.hjelpetekst} />
              </Lesmerpanel>
            ) : null}
            {spørsmål.svarliste.map((svar: ISvar) => {
              return (
                <div key={svar._id} className="radioknapp-wrapper">
                  <RadioPanel
                    id={spørsmål.sporsmal_tekst + ' ' + svar.tekst}
                    value={svar.tekst}
                    label={svar.tekst}
                    name={spørsmål._id}
                    checked={svar.checked ? svar.checked : false}
                    onChange={(e) => KlikkPåSvar(e, spørsmål, svar)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {ferdig ? (
        <>
          <div ref={nesteSpørsmål} />
          <Informasjonsboks steg={steg} disclaimer={disclaimer} />
        </>
      ) : null}
    </div>
  );
};

export default Spørsmål;
