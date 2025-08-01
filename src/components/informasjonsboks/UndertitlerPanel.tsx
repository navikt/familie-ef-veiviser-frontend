import React from 'react';
import { IUndertittel, IBrodtekst } from '../../models/Informasjonsboks';
import { MarkdownViewer } from '../utils/markdownviewer/MarkdownViewer';
import { Heading } from '@navikt/ds-react';

interface IUndertitlerPanelProps {
  undertitler: IUndertittel[];
  antall_undertitler_totalt?: number;
  className?: string;
}

const UndertitlerPanel: React.FC<IUndertitlerPanelProps> = ({
  undertitler,
}) => {
  const undertitlerMedInnhold = undertitler.filter(
    (undertittel) =>
      undertittel.tekst_i_panel ||
      (undertittel.brodtekster && undertittel.brodtekster.length) ||
      undertittel.knapp
  );

  const visKnapp = (undertittel: IUndertittel) => {
    return (
      undertittel.knapp && undertittel.knapp.tekst && undertittel.knapp.lenke
    );
  };

  return (
    <>
      {undertitlerMedInnhold.map((undertittel: IUndertittel, i: number) => {
        return (
          <div key={i}>
            {undertittel.tekst_i_panel && (
              <Heading size="small">{undertittel.tekst_i_panel}</Heading>
            )}

            {undertittel.brodtekster &&
              undertittel.brodtekster.map(
                (brodtekst: IBrodtekst, i: number) => {
                  return (
                    <div
                      className={
                        i === undertittel.brodtekster.length - 1 ? 'siste' : ''
                      }
                      key={i}
                    >
                      <MarkdownViewer key={i} markdown={brodtekst.body} />
                    </div>
                  );
                }
              )}

            {visKnapp(undertittel) && (
              <a
                href={undertittel.knapp.lenke}
                target="_blank"
                rel="noopener noreferrer"
                className="knapp"
              >
                {undertittel.knapp.tekst}
              </a>
            )}
          </div>
        );
      })}
    </>
  );
};

export default UndertitlerPanel;
