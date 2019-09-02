import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

import sporsmal from '../sporsmal.json';

interface SporsmalProps {
    steg: number,
    settSteg: (active: number) => void,
    settFerdig: (ferdig: boolean) => void,
}

const Sporsmal: React.FC<SporsmalProps> = ({ steg, settSteg, settFerdig }) => {

    const detteSporsmalet = sporsmal.find((s) => s.sporsmal_id === steg) || sporsmal[0];

    const handleNesteKlikk = (svar: any): void => {
        if (svar.ferdig) {
            settFerdig(true);
        }

        const nesteSteg = svar.goto || steg + 1;

        settSteg(nesteSteg);
    };

    return (
        <>
            <h1>{detteSporsmalet.sporsmal_tekst}</h1>
            {detteSporsmalet.svar.map((s, i) => {
                return (
                    <div key={i}>
                    <Knapp
                        className="sporsmal-knapp"
                        onClick={() => handleNesteKlikk(s)}>{s.tekst}
                        </Knapp>
                </div>)
            })}
        </>
    );
};

export default Sporsmal;
