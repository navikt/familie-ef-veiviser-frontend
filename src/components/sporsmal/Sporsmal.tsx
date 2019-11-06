import React, { useState, SyntheticEvent } from 'react';
import { IInfoMapping, ISporsmal, ISvar } from '../../models/Sporsmal';
import { RadioPanel } from 'nav-frontend-skjema';
import Informasjonsboks from '../informasjonsboks/Informasjonsboks';
import Lesmerpanel from 'nav-frontend-lesmerpanel';
import { scrollTilRef } from '../../utils/utils';

interface ISporsmalProps {
  steg: number;
  setSteg: (active: number) => void;
  setFerdig: (ferdig: boolean) => void;
  ferdig: boolean;
  sporsmalListe: ISporsmal[];
  infoMapping: IInfoMapping[];
  startet: boolean;
  scrollPunkt: any;
}

const Sporsmal: React.FC<ISporsmalProps> = ({
  scrollPunkt,
  sporsmalListe,
  steg,
  setSteg,
  setFerdig,
  ferdig,
  infoMapping,
  startet,
}) => {
  const [sporsmalSti, setSporsmalSti] = useState<any>([]);

  const detteSporsmalet = sporsmalListe.find(
    (sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg
  );

  if (!ferdig && !sporsmalSti.includes(detteSporsmalet) && startet) {
    sporsmalSti.push(detteSporsmalet);
  }

  const handleNesteKlikk = (
    e: SyntheticEvent<EventTarget>,
    sporsmal: ISporsmal,
    svar: ISvar
  ): void => {
    if (svar.done) {
      setFerdig(true);
    } else {
      setFerdig(false);
    }

    const sporsmalIndeks = sporsmalSti.findIndex(
      (s: ISporsmal) => s.sporsmal_id === sporsmal.sporsmal_id
    );

    sporsmalSti.length = sporsmalIndeks + 1;

    const nySporsmalSti = sporsmalSti.map((s: ISporsmal) => {
      if (s.sporsmal_id === sporsmal.sporsmal_id) {
        const nySvarliste = s.svarliste.map((sv: ISvar) => {
          if (sv._id === svar._id) {
            return { ...sv, checked: true };
          } else {
            return { ...sv, checked: false };
          }
        });

        return { ...sporsmal, svarliste: nySvarliste };
      }

      return s;
    });

    setSporsmalSti(nySporsmalSti);

    if (svar.done_complete) {
      const svarListe = sporsmalSti
        .map((sporsmal: ISporsmal) => {
          return sporsmal.svarliste.find((svar: ISvar) => svar.checked);
        })
        .filter((svar: ISvar) => svar);

      const svarIder = svarListe.map((svar: ISvar) => svar._id);

      let lengsteMatchId = -1;
      let lengsteMatchLengde = 0;

      for (let i = 0; i < infoMapping.length; i++) {
        const mapping = infoMapping[i];

        if (!mapping.svarsti || !mapping.svarsti.length) continue;

        const svarstiIder = mapping.svarsti.map((svar: ISvar) => svar._id);

        if (svarstiIder.every((val: string) => svarIder.includes(val))) {
          if (svarstiIder.length > lengsteMatchLengde) {
            lengsteMatchLengde = svarstiIder.length;
            lengsteMatchId = mapping.information_id;
          }
        }
      }

      setSteg(lengsteMatchId);
    } else {
      setSteg(svar.goto);
    }

    setTimeout(() => scrollTilRef(scrollPunkt), 120);
  };

  return (
    <div>
      {sporsmalSti.map((sporsmal: ISporsmal, index: number) => {
        return (
          <div key={sporsmal._id} className="sporsmal-element">
            {index === sporsmalSti.length - 1 && !ferdig ? (
              <div ref={scrollPunkt} />
            ) : null}
            <span className="sporsmal-tekst">{sporsmal.sporsmal_tekst}</span>
            {sporsmal && sporsmal.hjelpetekst_overskrift ? (
              <Lesmerpanel
                className="hjelpetekst"
                apneTekst={sporsmal.hjelpetekst_overskrift}
              >
                <p>{sporsmal.hjelpetekst}</p>
              </Lesmerpanel>
            ) : null}
            {sporsmal.svarliste.map((svar: ISvar) => {
              return (
                <div key={svar._id} className="radioknapp-wrapper">
                  <RadioPanel
                    value={svar.tekst}
                    label={svar.tekst}
                    name={sporsmal._id}
                    checked={svar.checked ? svar.checked : false}
                    onChange={(e) => handleNesteKlikk(e, sporsmal, svar)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {ferdig ? (
        <>
          <div ref={scrollPunkt} />
          <Informasjonsboks steg={steg} />
        </>
      ) : null}
    </div>
  );
};

export default Sporsmal;
