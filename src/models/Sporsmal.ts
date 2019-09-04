export interface ISporsmal {
    sporsmal_id: number,
    sporsmal_tekst: string,
    svarliste: ISvar[]
}

export interface ISvar {
    goto: number,
    tekst: string
    ferdig?: boolean
}
