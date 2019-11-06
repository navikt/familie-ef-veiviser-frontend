import React from 'react';
import { IUndertittel, IBrodtekst } from '../../models/Informasjonsboks';
import MarkdownViewer from '../utils/MarkdownViewer';

interface IUndertitlerPanelProps {
  undertitler: IUndertittel[];
  antall_undertitler_totalt?: number;
  className?: string;
}

const UndertitlerPanel: React.FC<IUndertitlerPanelProps> = ({
  undertitler,
  antall_undertitler_totalt,
  className,
}) => {
  const undertitlerIPanel = undertitler.filter(
    (undertittel) => undertittel.tekst_i_panel
  );

  const undertittelClass = className
    ? className
    : !undertitlerIPanel.length
    ? 'bare-brodtekst'
    : antall_undertitler_totalt && antall_undertitler_totalt > 1
    ? 'undertittel-flere'
    : 'undertittel-singel';

  const undertitlerMedInnhold = undertitler.filter(
    (undertittel) =>
      undertittel.tekst_i_panel ||
      (undertittel.brodtekster && undertittel.brodtekster.length) ||
      undertittel.knapp
  );

  return (
    <>
      {undertitlerMedInnhold.map((undertittel: IUndertittel, i: number) => {
        return (
          <div
            className={
              i === 0 && undertittel.ikke_rett_til
                ? `${undertittelClass}-0`
                : undertittelClass
            }
            key={i}
          >
            {undertittel.tekst_i_panel ? (
              <h2>{undertittel.tekst_i_panel}</h2>
            ) : null}
            {undertittel.brodtekster &&
              undertittel.brodtekster.map(
                (brodtekst: IBrodtekst, i: number) => {
                  return (
                    <div
                      className={
                        i === undertittel.brodtekster.length - 1 ? 'siste' : ''
                      }
                    >
                      <MarkdownViewer key={i} markdown={brodtekst.body} />
                    </div>
                  );
                }
              )}
            {undertittel.knapp &&
            undertittel.knapp.tekst &&
            undertittel.knapp.lenke ? (
              <a
                href={undertittel.knapp.lenke}
                target="_blank"
                rel="noopener noreferrer"
                className="knapp"
              >
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
