import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate, beregnAlderFraFodselsdato } from '../utils/dato';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import sporsmal from '../sporsmal.json';

interface SporsmalProps {
    steg: number,
    inntekt: number,
    settSteg: (active: number) => void,
    settAlder: (alder: number) => void,
    settFerdig: (ferdig: boolean) => void,
    settInntekt: (inntekt: number) => void
}

const Sporsmal: React.FC<SporsmalProps> = ({ inntekt, steg, settSteg, settAlder, settInntekt, settFerdig }) => {

    const detteSporsmalet = sporsmal.find((s) => s.sporsmal_id === steg) || sporsmal[0];

    const handleDateInputChange = (day: Date): void => {
        settAlder(beregnAlderFraFodselsdato(day));
    };

    const handleInputChange = (event: any): void => {
        settInntekt(event.target.value);
    };

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
            {detteSporsmalet.type === 'flervalg' && detteSporsmalet.svar && detteSporsmalet.svar.map((s, i) => {
                return (
                    <div key={i}>
                    <Knapp
                        className="sporsmal-knapp"
                        onClick={() => handleNesteKlikk(s)}>{s.tekst}
                        </Knapp>
                </div>)
            })}
            {detteSporsmalet.type === 'dato' && <div>
                <div className="datovelger-wrapper">
                    <DayPickerInput
                        formatDate={formatDate}
                        parseDate={parseDate}
                        format={'YYYY.MM.DD'}
                        placeholder={`${formatDate(new Date(), 'nb')}`}
                        onDayChange={handleDateInputChange}
                        dayPickerProps={{
                            locale: 'nb',
                            localeUtils: MomentLocaleUtils
                        }}
                    />
                </div>
                <Knapp
                    className="neste-knapp"
                    onClick={() => handleNesteKlikk(detteSporsmalet)}>
                    Neste
                </Knapp>
            </div>}
            {detteSporsmalet.type === 'input' && <div>
                <Input
                    value={inntekt}
                    label={''}
                    step={10000}
                    bredde="M"
                    type="number"
                    onChange={handleInputChange}
                />
                <Knapp
                    className="neste-knapp"
                    onClick={() => handleNesteKlikk(detteSporsmalet)}>
                    Neste
                </Knapp>
            </div>}
        </>
    );
};

export default Sporsmal;
