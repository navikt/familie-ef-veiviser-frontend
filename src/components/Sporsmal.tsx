import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { ISporsmal, ISvar } from '../models/Sporsmal';

interface ISporsmalProps {
    steg: number,
    settSteg: (active: number) => void,
    settFerdig: (ferdig: boolean) => void,
    sporsmalListe: ISporsmal[],
}

const Sporsmal: React.FC<ISporsmalProps> = ({ sporsmalListe, steg, settSteg, settFerdig }) => {

    const [sporsmalPath, settSporsmalPath] = useState<any>([]);

    const detteSporsmalet = sporsmalListe.find((sporsmal: ISporsmal) => sporsmal.sporsmal_id === steg) || sporsmalListe[0];

    sporsmalPath.push(detteSporsmalet);

    const handleNesteKlikk = (sporsmal: ISporsmal, svar: ISvar): void => {
        const sporsmalIndeks = sporsmalPath.findIndex((s: any) => s.sporsmal_id === sporsmal.sporsmal_id);

        sporsmalPath.length = sporsmalIndeks + 1;

        if (svar.ferdig) {
            settFerdig(true);
        }

        const nesteSteg = svar.goto || steg + 1;

        settSteg(nesteSteg);
    };

    return (sporsmalPath.map((sporsmal: any) => {
        return (
            <>
                <h1>{sporsmal.sporsmal_tekst}</h1>
                {sporsmal.svarliste.map((svar: ISvar, i: number) => {
                    return (
                        <div key={i}>
                            <Knapp
                                className="sporsmal-knapp"
                                onClick={() => handleNesteKlikk(sporsmal, svar)}>{svar.tekst}
                            </Knapp>
                        </div>)
                })}
            </>
        );
    }));
};

export default Sporsmal;
