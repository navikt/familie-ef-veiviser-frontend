import React, { useState } from 'react';
import 'react-day-picker/lib/style.css';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Panel } from 'nav-frontend-paneler';
import informasjonstekst from '../informasjonstekst.json';

interface InformasjonstekstProps {
    steg: number,
    alder: number,
    inntekt: number
}

const Informasjonstekst: React.FC<InformasjonstekstProps> = ({ steg, alder, inntekt }) => {

    const infotekst = informasjonstekst.find((s) => s.svar_id === steg) || informasjonstekst[0];

    return (
        <>
            <h2>{infotekst.header}</h2>
            <h3>{infotekst.header2}</h3>
            <div className="tekst-wrapper">
                <Panel>
                    <Tekstomrade>
                        {`${infotekst.body}`}
                    </Tekstomrade>
                </Panel>
            </div>
        </>
    );

};

export default Informasjonstekst;
