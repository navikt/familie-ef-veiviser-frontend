import {ISpørsmål, ISvar, ISvarstiTilInformasjonsboksMapping} from "../../models/Spørsmål";
import { RefObject } from 'react';

const scrollTilRef = (ref: RefObject<HTMLDivElement>) => {
    if (!ref || !ref.current) return;
    window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

export const scrollTilNesteSpørsmal = (
    nesteSpørsmål: RefObject<HTMLDivElement>
) => {
    setTimeout(() => scrollTilRef(nesteSpørsmål), 120);
};


export const hoppTilSpørsmål = (spørsmål: ISpørsmål, spørsmålSti: ISpørsmål[]) => {
    const spørsmålIndeks = spørsmålSti.findIndex(
        (s: ISpørsmål) => s.sporsmal_id === spørsmål.sporsmal_id
    );

    spørsmålSti.length = spørsmålIndeks + 1;
};

export const finnSpørsmålStiMedBesvarteSvar = (spørsmålSti: ISpørsmål[], spørsmål: ISpørsmål, svar: ISvar) => {
    return spørsmålSti.map((s: ISpørsmål) => {
        if (s.sporsmal_id === spørsmål.sporsmal_id) {
            const nySvarliste = s.svarliste.map((sv: ISvar) => {
                if (sv._id === svar._id) {
                    return {...sv, checked: true};
                } else {
                    return {...sv, checked: false};
                }
            });

            return {...spørsmål, svarliste: nySvarliste};
        }

        return s;
    });
};

export const besvarteSvar = (spørsmålSti: ISpørsmål[]) => {
    const svarListe = spørsmålSti
        .map((spørsmål: ISpørsmål) => {
            return spørsmål.svarliste.find((svar: ISvar) => svar.checked);
        })
        .filter((svar: ISvar | undefined) => svar);

    return svarListe.map((svar: ISvar | undefined) => svar && svar._id);
};

export const finnInformasjonsboksMedFlestMatchendeSvar = (svarstiTilInformasjonsboksMappingListe: ISvarstiTilInformasjonsboksMapping[], besvarteSvarIDer: (string | undefined)[]) => {
    let lengsteMatchId = -1;
    let lengsteMatchLengde = 0;

    for (let i = 0; i < svarstiTilInformasjonsboksMappingListe.length; i++) {
        const mapping = svarstiTilInformasjonsboksMappingListe[i];

        if (!mapping.svarsti || !mapping.svarsti.length) continue;

        const svarstiIder = mapping.svarsti.map((svar: ISvar) => svar._id);

        if (svarstiIder.every((val: string) => besvarteSvarIDer && besvarteSvarIDer.includes(val))) {
            if (svarstiIder.length > lengsteMatchLengde) {
                lengsteMatchLengde = svarstiIder.length;
                lengsteMatchId = mapping.information_id;
            }
        }
    }
    return lengsteMatchId;
};