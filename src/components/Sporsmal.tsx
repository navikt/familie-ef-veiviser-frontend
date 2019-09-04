import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { ISporsmal, ISvar } from '../models/Sporsmal';

interface ISporsmalProps {
    steg: number,
    settSteg: (active: number) => void,
    settFerdig: (ferdig: boolean) => void,
    sporsmalListe: ISporsmal[]
}

const Sporsmal: React.FC<ISporsmalProps> = ({ sporsmalListe, steg, settSteg, settFerdig }) => {

    const detteSporsmalet = sporsmalListe.find((sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg) || sporsmalListe[0];

    const handleNesteKlikk = (svar: ISvar): void => {
        if (svar.ferdig) {
            settFerdig(true);
        }

        const nesteSteg = svar.goto || steg + 1;

        settSteg(nesteSteg);
    };

    return (
        <>
            <h1>{detteSporsmalet.sporsmal_tekst}</h1>
            {detteSporsmalet.svarliste.map((svar: ISvar, i: number) => {
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
