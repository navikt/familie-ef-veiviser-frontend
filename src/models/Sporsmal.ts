export interface ISporsmal {
  _id?: string;
  sporsmal_id: number;
  sporsmal_tekst: string;
  svarliste: ISvar[];
  hjelpetekst_overskrift?: string;
  hjelpetekst?: string;
}

export interface ISvar {
  _key: string;
  goto: number;
  tekst: string;
  done?: boolean;
  checked?: boolean;
}
