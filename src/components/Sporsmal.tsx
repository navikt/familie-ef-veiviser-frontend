import React, { useState, SyntheticEvent, FormEvent, ChangeEvent } from 'react';
import { ISporsmal, ISvar } from '../models/Sporsmal';
import { RadioPanel } from 'nav-frontend-skjema';
import Informasjonsboks from './informasjonsboks/Informasjonsboks';
import Lesmerpanel from 'nav-frontend-lesmerpanel';

interface ISporsmalProps {
  steg: number;
  setSteg: (active: number) => void;
  setFerdig: (ferdig: boolean) => void;
  ferdig: boolean;
  sporsmalListe: ISporsmal[];
}

interface IRadioCheckedStatus {
  [key: string]: boolean;
}

interface ISporsmalState {
  sporsmalPath: ISporsmal[];
  radioCheckedStatus: IRadioCheckedStatus;
}

const Sporsmal: React.FC<ISporsmalProps> = ({
  sporsmalListe,
  steg,
  setSteg,
  setFerdig,
  ferdig,
}) => {
  const [state, setState] = useState<any>({
    sporsmalPath: [],
    radioCheckedStatus: {},
  });

  const detteSporsmalet = sporsmalListe.find(
    (sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg
  );

  if (!ferdig) {
    state.sporsmalPath.push(detteSporsmalet);
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

    const sporsmalIndeks = state.sporsmalPath.findIndex(
      (s: any) => s.sporsmal_id === sporsmal.sporsmal_id
    );

    state.sporsmalPath.length = sporsmalIndeks + 1;

    const newRadioCheckedStatus: any = {};

    sporsmal.svarliste.forEach((svarElement) => {
      newRadioCheckedStatus[svarElement._key] = svarElement._key === svar._key;
    });

    setState((prevState: ISporsmalState) => ({
      ...prevState,
      radioCheckedStatus: {
        ...newRadioCheckedStatus,
        ...prevState.radioCheckedStatus,
      },
    }));

    setSteg(svar.goto);
  };

  return (
    <div>
      {state.sporsmalPath.map((sporsmal: any) => {
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
                    checked={state.radioCheckedStatus[svar._key]}
                    onChange={(e) => handleNesteKlikk(e, sporsmal, svar)}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {ferdig ? <Informasjonsboks steg={steg} /> : null}
    </div>
  );
};

export default Sporsmal;
