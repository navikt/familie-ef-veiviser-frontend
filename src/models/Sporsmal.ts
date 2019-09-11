export interface ISporsmal {
    sporsmal_id: number,
    sporsmal_tekst: string,
    svarliste: ISvar[]
}

export interface ISvar {
    _key: string,
    goto: number,
    tekst: string
    ferdig?: boolean
}
