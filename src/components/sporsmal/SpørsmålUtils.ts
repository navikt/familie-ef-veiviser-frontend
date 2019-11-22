import {ISporsmal, ISvar} from "../../models/Sporsmal";

export const hoppTilSpørsmål = (spørsmål: ISporsmal, spørsmålSti: ISporsmal[]) => {
    const spørsmålIndeks = spørsmålSti.findIndex(
        (s: ISporsmal) => s.sporsmal_id === spørsmål.sporsmal_id
    );

    spørsmålSti.length = spørsmålIndeks + 1;
};

export const finnSpørsmålStiMedBesvarteSvar = (spørsmålSti: ISporsmal[], spørsmål: ISporsmal, svar: ISvar) => {
    return spørsmålSti.map((s: ISporsmal) => {
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

export const besvarteSvar = (spørsmålSti: ISporsmal[]) => {
    const svarListe = spørsmålSti
        .map((spørsmål: ISporsmal) => {
            return spørsmål.svarliste.find((svar: ISvar) => svar.checked);
        })
        .filter((svar: ISvar | undefined) => svar);

    return svarListe.map((svar: ISvar | undefined) => svar && svar._id);
};

export const finnInformasjonsboksMedFlestMatchendeSvar = (svarstiTilInformasjonsboksMapping: any, besvarteSvarIDer: (string | undefined)[]) => {
    let lengsteMatchId = -1;
    let lengsteMatchLengde = 0;

    for (let i = 0; i < svarstiTilInformasjonsboksMapping.length; i++) {
        const mapping = svarstiTilInformasjonsboksMapping[i];

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