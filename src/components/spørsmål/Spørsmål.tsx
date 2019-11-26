import React, { useState, SyntheticEvent } from 'react';
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
  setSteg: (active: number) => void;
  setFerdig: (ferdig: boolean) => void;
  ferdig: boolean;
  spørsmålListe: ISpørsmål[];
  svarstiTilInformasjonsboksMapping: ISvarstiTilInformasjonsboksMapping[];
  startet: boolean;
  nesteSpørsmål: any;
  disclaimer?: string;
}

const Spørsmål: React.FC<ISpørsmålProps> = ({
  nesteSpørsmål,
  spørsmålListe,
  steg,
  setSteg,
  setFerdig,
  ferdig,
  svarstiTilInformasjonsboksMapping,
  startet,
  disclaimer,
}) => {
  const [spørsmålSti, setSpørsmålSti] = useState<any>([]);

  const detteSporsmalet = spørsmålListe.find(
    (spørsmål: ISpørsmål) => spørsmål.sporsmal_id === steg
  );

  if (!ferdig && !spørsmålSti.includes(detteSporsmalet) && startet) {
    spørsmålSti.push(detteSporsmalet);
  }

  const KlikkPåSvar = (
    e: SyntheticEvent<EventTarget>,
    spørsmål: ISpørsmål,
    svar: ISvar
  ): void => {
    if (svar.done) {
      setFerdig(true);
    } else {
      setFerdig(false);
    }

    hoppTilSpørsmål(spørsmål, spørsmålSti);

    setSpørsmålSti(finnSpørsmålStiMedBesvarteSvar(spørsmålSti, spørsmål, svar));

    const besvarteSvarIDer = besvarteSvar(spørsmålSti);

    let lengsteMatchId = finnInformasjonsboksMedFlestMatchendeSvar(svarstiTilInformasjonsboksMapping, besvarteSvarIDer);

    if (svar.done_complete) {
      setSteg(lengsteMatchId);
    } else {
      setSteg(svar.goto);
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
