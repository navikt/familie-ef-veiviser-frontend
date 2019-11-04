import React from 'react';
import { IUndertittel, IBrodtekst } from '../../models/Informasjonsboks';
import MarkdownViewer from '../utils/MarkdownViewer';

interface IUndertitlerPanelProps {
  undertitler: IUndertittel[];
  antall_undertitler_totalt?: number;
}

const UndertitlerPanel: React.FC<IUndertitlerPanelProps> = ({
  undertitler,
  antall_undertitler_totalt,
}) => {
  const undertitlerIPanel = undertitler.filter(
    (undertittel) => undertittel.tekst_i_panel
  );

  const undertittelClass = !undertitlerIPanel.length
    ? 'bare-brodtekst'
    : antall_undertitler_totalt && antall_undertitler_totalt > 1
    ? 'undertittel-flere'
    : 'undertittel-singel';

  return (
    <>
      {undertitler.map((undertittel: IUndertittel, i: number) => {
        return (
          <div className={undertittelClass} key={i}>
            {undertittel.tekst_i_panel ? (
              <h2>{undertittel.tekst_i_panel}</h2>
            ) : null}
            {undertittel.brodtekster &&
              undertittel.brodtekster.map(
                (brodtekst: IBrodtekst, i: number) => {
                  return <MarkdownViewer key={i} markdown={brodtekst.body} />;
                }
              )}
            {undertittel.knapp &&
            undertittel.knapp.tekst &&
            undertittel.knapp.lenke ? (
              <a href={undertittel.knapp.lenke} className="knapp">
                {undertittel.knapp.tekst}
              </a>
            ) : null}
            {i === undertitlerIPanel.length - 2 &&
            undertitlerIPanel[undertitlerIPanel.length - 1].tekst_i_panel ===
              'Andre stønader og ordninger som kan være aktuelle for deg som er alene med barn' ? (
              <hr />
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default UndertitlerPanel;
