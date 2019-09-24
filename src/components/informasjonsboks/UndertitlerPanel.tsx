import React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import { Normaltekst } from 'nav-frontend-typografi';
import { IUndertittel } from '../../models/Informasjonsboks';
import MarkdownViewer from '../MarkdownViewer';

interface IUndertitlerPanelProps {
  undertitler: IUndertittel[];
}

const UndertitlerPanel: React.FC<IUndertitlerPanelProps> = ({
  undertitler,
}) => {
  return (
    <>
      {undertitler.map((undertittel: IUndertittel, i: number) => {
        return (
          <div className="undertittel-panel" key={i}>
            <h2>{undertittel.tekst_i_panel}</h2>
            {undertittel.brodtekster.map((brodtekst: any, i: number) => {
              return <MarkdownViewer key={i} markdown={brodtekst.body} />;
            })}
          </div>
        );
      })}
    </>
  );
};

export default UndertitlerPanel;
