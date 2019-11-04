export interface IInformasjonsboks {
  information_id: number;
  undertitler: IUndertittel[];
}

export interface IUndertittel {
  brodtekster: IBrodtekst[];
  tekst_i_liste: string;
  tekst_i_panel: string;
  knapp: IKnapp;
  ikke_rett_til: boolean | undefined;
  antall_undertitler_totalt?: number;
}

export interface IBrodtekst {
  body: string;
}

export interface IKnapp {
  lenke: string;
  tekst: string;
}

export interface IBrodtekst {
  body: string;
}
