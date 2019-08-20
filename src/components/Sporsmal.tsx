import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { STANDARD_DATOFORMAT, GYLDIGE_DATOFORMAT, formatDate, parseDate } from '../utils/dato';
import moment from 'moment';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';

import sporsmal from '../sporsmal.json';

const Sporsmal = () => {

    const [steg, settSteg] = useState<number>(0);
    const [alder, settAlder] = useState<number>(0);

    const detteSporsmalet = sporsmal[steg];

    const handleInputChange = (day: Date): void => {
        settAlder(moment().diff(moment(day), 'years'));
    };

    return (
        <>
            <h1>{detteSporsmalet.sporsmal_tekst}</h1>
            {detteSporsmalet.type === 'flervalg' && detteSporsmalet.svar && detteSporsmalet.svar.map((s, i) => {
                return (
                    <div key={i}>
                    <Knapp
                        className="sporsmal-knapp"
                        onClick={() => settSteg(s.goto)}>{s.tekst}
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
                        onDayChange={handleInputChange}
                        dayPickerProps={{
                            locale: 'nb',
                            localeUtils: MomentLocaleUtils
                        }}
                    />
                </div>
                <Knapp
                    className="neste-knapp"
                    onClick={() => settSteg(steg + 1)}>
                    Neste
                </Knapp>
            </div>}
        </>
    );
};

export default Sporsmal;
