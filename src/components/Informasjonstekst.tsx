import React, { useState } from 'react';
import 'react-day-picker/lib/style.css';
import informasjonstekst from '../informasjonstekst.json';

interface InformasjonstekstProps {
    steg: number,
    alder: number,
    inntekt: number
}

const Informasjonstekst: React.FC<InformasjonstekstProps> = ({ steg, alder, inntekt }) => {

    const infotekst = informasjonstekst.find((s) => s.svar_id === steg) || informasjonstekst[0];

    return <div dangerouslySetInnerHTML={{__html: infotekst.body}} />;

};

export default Informasjonstekst;
