import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import 'moment/locale/nb';
import moment from 'moment';

import sporsmal from '../sporsmal.json';

const DEFAULT_DATEPICKER_FORMAT = 'DD.MM.YYYY';
const VALID_DATEPICKER_FORMATS = ['DD.MM.YYYY', 'DDMMYYYY', 'DD.MM.YY', 'DDMMYY'];

const Sporsmal = () => {

    const [steg, settSteg] = useState<number>(0);
    const [fodselsdato, settFodselsdato] = useState<Date>(new Date());

    const detteSporsmalet = sporsmal[steg];

    const handleInputChange = (day: Date): void => {
        settFodselsdato(day);
    };

    const formatDate = (date: Date, locale: string = 'nb') => {
        const format = DEFAULT_DATEPICKER_FORMAT;

        return moment(date)
            .locale(locale)
            .format(Array.isArray(format) ? format[0] : format);
    };

    const parseDate = (str: string, format: string = 'DD.MM.YYYY', locale: string = 'nb') => {
        const m = moment(str, VALID_DATEPICKER_FORMATS, locale, true);

        if (m.isValid()) {
            return m.toDate();
        }

        return undefined;
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
                <DayPickerInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    format={'YYYY.MM.DD'}
                    placeholder={`${formatDate(new Date(), 'nb')}`}
                    onDayChange={handleInputChange}
                />
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
