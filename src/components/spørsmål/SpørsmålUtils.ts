import {ISpørsmål, ISvar, ISvarstiTilInformasjonsboksMapping} from "../../models/Spørsmål";
import { RefObject } from 'react';

const scrollTilRef = (ref: RefObject<HTMLDivElement | null>) => {
    if (!ref || !ref.current) return;
    window.scrollTo({ top: ref.current!.offsetTop, left: 0, behavior: 'smooth' });
};

export const scrollTilNesteSpørsmal = (
    nesteSpørsmål: RefObject<HTMLDivElement | null>
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
    return spørsmålSti.map((s: ISpørsmål, i: number) => {
        if (s.sporsmal_id === spørsmål.sporsmal_id) {
            const nySvarliste = s.svarliste.map((sv: ISvar) => {
                if (sv._id === svar._id) {
                    return {...sv, checked: true};
                } else {
                    return {...sv, checked: false};
                }
            });

            return {...spørsmål, svarliste: nySvarliste, index: i};
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
    
    let svarListeMedSpørsmålId = [];

    const svarIder = svarListe.map((svar: ISvar | undefined) => svar && svar._id);

    for (let i = 0; i < svarIder.length; i++) {
        const svar = svarIder[i];
        if (!svar) return;
        svarListeMedSpørsmålId.push({"id": svar, "sporsmal_id": spørsmålSti[i].sporsmal_id})
    }

    return svarListeMedSpørsmålId;
};

export const finnInformasjonsboksMedFlestMatchendeSvar = (svarstiTilInformasjonsboksMappingListe: ISvarstiTilInformasjonsboksMapping[], besvarteSvarMedSpørsmålId: any) => {
    let lengsteMatchId = -1;
    let lengsteMatchLengde = 0;
    let førsteSpørsmålMatch = Infinity;

    const besvarteSvarIDer = besvarteSvarMedSpørsmålId.map((svar: any) => svar.id);

    for (let i = 0; i < svarstiTilInformasjonsboksMappingListe.length; i++) {
        const mapping = svarstiTilInformasjonsboksMappingListe[i];

        if (!mapping.svarsti || !mapping.svarsti.length) continue;

        const svarstiIder = mapping.svarsti.map((svar: ISvar) => svar._id);

        if (svarstiIder.every((val: string) => besvarteSvarIDer && besvarteSvarIDer.includes(val))) {

            const matchendeSpørsmål: any = [];

            svarstiIder.forEach((val: string) => {
                let index = besvarteSvarIDer.indexOf(val);
                matchendeSpørsmål.push(index);
            });

            if ((svarstiIder.length > lengsteMatchLengde) || (svarstiIder.length === lengsteMatchLengde && Math.min(...matchendeSpørsmål) < førsteSpørsmålMatch)) {
                førsteSpørsmålMatch = Math.min(...matchendeSpørsmål);
                lengsteMatchLengde = svarstiIder.length;
                lengsteMatchId = mapping.information_id;
            }
        }
    }
    return lengsteMatchId;
};