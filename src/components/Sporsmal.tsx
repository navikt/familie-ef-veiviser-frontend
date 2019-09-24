import React, { useState } from 'react';
import { ISporsmal, ISvar } from '../models/Sporsmal';
import { RadioPanel } from 'nav-frontend-skjema';
import Informasjonsboks from './informasjonsboks/Informasjonsboks';

interface ISporsmalProps {
  steg: number;
  settSteg: (active: number) => void;
  settFerdig: (ferdig: boolean) => void;
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
  settSteg,
  settFerdig,
  ferdig,
}) => {
  const [state, settState] = useState<any>({
    sporsmalPath: [],
    radioCheckedStatus: {},
  });

  const detteSporsmalet = sporsmalListe.find(
    (sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg
  );

  if (!ferdig) {
    state.sporsmalPath.push(detteSporsmalet);
  }

  const handleNesteKlikk = (e: any, sporsmal: ISporsmal, svar: ISvar): void => {
    if (svar.done) {
      settFerdig(true);
    }

    const newRadioCheckedStatus: any = {};

    sporsmal.svarliste.forEach((svarElement) => {
      newRadioCheckedStatus[svarElement._key] = svarElement._key === svar._key;
    });

    settState((prevState: ISporsmalState) => ({
      ...prevState,
      radioCheckedStatus: {
        ...newRadioCheckedStatus,
        ...prevState.radioCheckedStatus,
      },
    }));

    const sporsmalIndeks = state.sporsmalPath.findIndex(
      (s: any) => s.sporsmal_id === sporsmal.sporsmal_id
    );

    state.sporsmalPath.length = sporsmalIndeks + 1;

    settSteg(svar.goto);
  };

  return (
    <div>
      {state.sporsmalPath.map((sporsmal: any) => {
        return (
          <div key={sporsmal._id} className="sporsmal-element">
            <span className="sporsmal-tekst">{sporsmal.sporsmal_tekst}</span>
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
