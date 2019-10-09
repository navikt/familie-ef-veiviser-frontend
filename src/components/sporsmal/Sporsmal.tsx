import React, { useState, SyntheticEvent, useRef } from 'react';
import { ISporsmal, ISvar } from '../../models/Sporsmal';
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
}

const Sporsmal: React.FC<ISporsmalProps> = ({
  sporsmalListe,
  steg,
  setSteg,
  setFerdig,
  ferdig,
}) => {
  const [state, setState] = useState<any>({
    sporsmalSti: [],
  });

  const scrollPunkt = useRef(null);

  const detteSporsmalet = sporsmalListe.find(
    (sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg
  );

  if (!ferdig) {
    state.sporsmalSti.push(detteSporsmalet);
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

    const sporsmalIndeks = state.sporsmalSti.findIndex(
      (s: ISporsmal) => s.sporsmal_id === sporsmal.sporsmal_id
    );

    state.sporsmalSti.length = sporsmalIndeks + 1;

    const nySporsmalSti = state.sporsmalSti.map((s: ISporsmal) => {
      if (s.sporsmal_id === sporsmal.sporsmal_id) {
        const nySvarliste = s.svarliste.map((sv: ISvar) => {
          if (sv._key === svar._key) {
            return { ...sv, checked: true };
          } else {
            return { ...sv, checked: false };
          }
        });

        return { ...sporsmal, svarliste: nySvarliste };
      }

      return s;
    });

    setState({ sporsmalSti: nySporsmalSti });
    setSteg(svar.goto);

    setTimeout(() => scrollTilRef(scrollPunkt), 120);
  };

  return (
    <div>
      {state.sporsmalSti.map((sporsmal: ISporsmal) => {
        return (
          <div key={sporsmal._id} className="sporsmal-element">
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
                <div key={svar._key} className="radioknapp-wrapper">
                  <RadioPanel
                    value={svar.tekst}
                    label={svar.tekst}
                    name={svar._key}
                    checked={svar.checked ? svar.checked : false}
                    onChange={(e) => handleNesteKlikk(e, sporsmal, svar)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <div ref={scrollPunkt} />
      {ferdig ? <Informasjonsboks steg={steg} /> : null}
    </div>
  );
};

export default Sporsmal;
