export interface IInformasjonsboks {
  information_id: number;
  undertitler: IUndertittel[];
}

export interface IUndertittel {
  brodtekster: IBrodtekst[];
  tekst_i_liste: string;
  tekst_i_panel: string;
  knapp: IKnapp;
}

export interface IBrodtekst {
  body: string;
}

export interface IKnapp {
  lenke: string;
  tekst: string;
}
