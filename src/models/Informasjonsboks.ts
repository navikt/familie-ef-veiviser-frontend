export interface IInformasjonsboks {
  information_id: number;
  undertitler: IUndertittel[];
}

export interface IUndertittel {
  brodtekster: IBrodtekst[];
  tekst_i_liste: string;
  tekst_i_panel: string;
}

export interface IBrodtekst {
  body: string;
}
