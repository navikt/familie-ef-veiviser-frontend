import React, { useState } from 'react';
import './App.scss';
import { Knapp } from 'nav-frontend-knapper';

import sporsmal from './sporsmal.json';

const Sporsmal = () => {

    const [steg, settSteg] = useState<number>(0);
    const [fodselsdato, settFodselsdato] = useState<number>(10);

    const detteSporsmalet = sporsmal[steg];

    return (
        <div className="Question">
            <h1>{detteSporsmalet.sporsmal_tekst}</h1>
            {detteSporsmalet.type === 'mc' && detteSporsmalet.svar && detteSporsmalet.svar.map((s, i) => {
                return (
                    <div key={i}>
                    <Knapp onClick={() => settSteg(s.goto)}>{s.tekst}</Knapp>
                </div>)
            })}
        </div>
    );
};

export default Sporsmal;
