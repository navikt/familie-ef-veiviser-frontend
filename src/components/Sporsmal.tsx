import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

interface SporsmalProps {
    steg: number,
    settSteg: (active: number) => void,
    settFerdig: (ferdig: boolean) => void,
    sporsmal: any
}

const Sporsmal: React.FC<SporsmalProps> = ({ sporsmal, steg, settSteg, settFerdig }) => {

    const detteSporsmalet = sporsmal.find((s: any) => s.sporsmal_id === steg) || sporsmal[0];

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
            {detteSporsmalet.svarliste.map((svar: any, i: any) => {
                return (
                    <div key={i}>
                    <Knapp
                        className="sporsmal-knapp"
                        onClick={() => handleNesteKlikk(svar)}>{svar.tekst}
                        </Knapp>
                </div>)
            })}
        </>
    );
};

export default Sporsmal;
