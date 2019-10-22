import React from 'react';
import { IUndertittel } from '../../models/Informasjonsboks';
import MarkdownViewer from '../utils/MarkdownViewer';

interface IUndertitlerPanelProps {
  undertitler: IUndertittel[];
}

const UndertitlerPanel: React.FC<IUndertitlerPanelProps> = ({
  undertitler,
}) => {
  const undertittelClass =
    undertitler.length > 1 ? 'undertittel-flere' : 'undertittel-singel';

  return (
    <>
      {undertitler.map((undertittel: IUndertittel, i: number) => {
        return (
          <div className={undertittelClass} key={i}>
            {undertittel.tekst_i_panel ? (
              <h2>{undertittel.tekst_i_panel}</h2>
            ) : null}
            {undertittel.brodtekster.map((brodtekst: any, i: number) => {
              return <MarkdownViewer key={i} markdown={brodtekst.body} />;
            })}
            {undertittel.knapp &&
            undertittel.knapp.tekst &&
            undertittel.knapp.lenke ? (
              <a href={undertittel.knapp.lenke} className="knapp">
                {undertittel.knapp.tekst}
              </a>
            ) : null}
            {i === undertitler.length - 2 &&
            undertitler[undertitler.length - 1].tekst_i_panel ===
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
