export interface ISpørsmål {
  startet: boolean;
  _id: string;
  sporsmal_id: number;
  sporsmal_tekst: string;
  svarliste: ISvar[];
  hjelpetekst_overskrift?: string;
  hjelpetekst?: string;
}

export interface ISvar {
  _id: string;
  goto: number;
  tekst: string;
  done?: boolean;
  done_complete?: boolean;
  checked?: boolean;
}

export interface ISvarstiTilInformasjonsboksMapping {
  information_id: number;
  svarsti?: ISvar[];
}
