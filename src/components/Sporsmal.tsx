import React, { useState } from 'react';
import { ISporsmal, ISvar } from '../models/Sporsmal';
import { RadioPanel } from 'nav-frontend-skjema';

interface ISporsmalProps {
    steg: number,
    settSteg: (active: number) => void,
    settFerdig: (ferdig: boolean) => void,
    sporsmalListe: ISporsmal[],
}

const Sporsmal: React.FC<ISporsmalProps> = ({ sporsmalListe, steg, settSteg, settFerdig }) => {

    const [state, settState]: any = useState({
        sporsmalPath: []
    });

    const detteSporsmalet = sporsmalListe.find((sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg) || sporsmalListe[0];

    state.sporsmalPath.push(detteSporsmalet);

    const handleNesteKlikk = (e: any, sporsmal: ISporsmal, svar: ISvar): void => {
        settState({
            ...state,
            [e.target.name]: e.target.checked
        });

        const sporsmalIndeks = state.sporsmalPath.findIndex((s: any) => s.sporsmal_id === sporsmal.sporsmal_id);

        state.sporsmalPath.length = sporsmalIndeks + 1;

        if (svar.ferdig) {
            settFerdig(true);
        }

        const nesteSteg = svar.goto || steg + 1;

        settSteg(nesteSteg);
    };

    console.log(state.sporsmalPath);

    return (state.sporsmalPath.map((sporsmal: any) => {

        return (
            <div className="sporsmal-element">
                <span className="sporsmal-tekst">{sporsmal.sporsmal_tekst}</span>
                {sporsmal.svarliste.map((svar: ISvar, i: number) => {
                    return (
                        <div
                            key={i}
                            className="radioknapp-wrapper"
                        >
                            <RadioPanel
                                value={svar.tekst}
                                label={svar.tekst}
                                name={svar.tekst}
                                checked={state[svar.tekst]}
                                onChange={(e) => handleNesteKlikk(e, sporsmal, svar)} />
                        </div>)
                })}
            </div>
        );
    }));
};

export default Sporsmal;
