import React, { useState, useEffect, useRef } from 'react';
import Spørsmål from './components/spørsmål/Spørsmål';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './components/feilside/Feilside';
import { Innholdstittel } from 'nav-frontend-typografi';
import VeiviserHeader from './components/veiviser-header/VeiviserHeader';
import Brødsmuler from './components/brødsmuler/Brødsmuler';
import { Panel } from 'nav-frontend-paneler';
import {
  client,
  hentSpørsmålQuery,
  svarstiTilInformasjonsboksQuery,
} from './utils/sanity';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
  ISvarstiTilInformasjonsboksMapping,
  ISpørsmål,
} from './models/Spørsmål';
import { scrollTilNesteSpørsmal } from './components/spørsmål/SpørsmålUtils';

const App = () => {
  const [spørsmålListe, settSpørsmålListe] = useState<ISpørsmål[]>([]);
  const [ferdig, settFerdig] = useState<boolean>(false);
  const [disclaimer, settDisclaimer] = useState<string>('');
  const [alert, settAlert] = useState<string>('');
  const [steg, settSteg] = useState<number>(1);
  const [henter, settHenter] = useState<boolean>(true);
  const [feil, settFeil] = useState<boolean>(false);
  const [
    svarstiTilInformasjonsboksMapping,
    settSvarstiTilInformasjonsboksMapping,
  ] = useState<ISvarstiTilInformasjonsboksMapping[]>([]);
  const [startet, settStartet] = useState<boolean>(false);
  const nesteSpørsmål = useRef(null);

  useEffect(() => {
    const fetchSvarstiTilInformasjonsboksMapping = () => {
      client
        .fetch(svarstiTilInformasjonsboksQuery, {
          type: 'informasjonsboks',
        })
        .then((res: ISvarstiTilInformasjonsboksMapping[]) => {
          settSvarstiTilInformasjonsboksMapping(res);
        })
        .catch((err: Error) => {
          console.log('err', err);
          console.error('Oh no, feil occured: ', err);
        });
    };

    const fetchSpørsmål = () => {
      client
        .fetch(hentSpørsmålQuery, { type: 'sporsmal' })
        .then((res: ISpørsmål[]) => {
          settSpørsmålListe(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });

      settHenter(false);
    };

    const fetchDisclaimer = () => {
      client
        .fetch('*[_type == $type][0]', { type: 'disclaimer' })
        .then((res: any) => {
          settDisclaimer(res.disclaimer);
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });
    };

    const fetchAlert = () => {
      client
        .fetch('*[_type == $type][0]', { type: 'alert' })
        .then((res: any) => {
          if (res && res.alert) {
            settAlert(res.alert);
          }
        })
        .catch((err: Error) => {
          console.error('Oh no, feil occured: ', err);
          settFeil(true);
        });
    };

    fetchSpørsmål();
    fetchSvarstiTilInformasjonsboksMapping();
    fetchDisclaimer();
    fetchAlert();
  }, []);

  const startVeiviser = () => {
    settStartet(true);
    scrollTilNesteSpørsmal(nesteSpørsmål);
  };

  if (henter) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (!feil && spørsmålListe && spørsmålListe.length) {
    return (
      <div className="app">
        <div className="side-header">
          <Innholdstittel>Hva kan du få?</Innholdstittel>
        </div>
        <Brødsmuler // eslint-disable-line
        />
        <Panel className="innholdspanel">
          <div className="innholdscontainer">
            <VeiviserHeader />
            {!startet ? (
              <div className="knappwrapper">
                <Hovedknapp className="startknapp" onClick={startVeiviser}>
                  Start veiviseren
                </Hovedknapp>
              </div>
            ) : null}
            <Spørsmål // eslint-disable-line
              nesteSpørsmål={nesteSpørsmål}
              startet={startet}
              spørsmålListe={spørsmålListe}
              settSteg={settSteg}
              settFerdig={settFerdig}
              ferdig={ferdig}
              steg={steg}
              svarstiTilInformasjonsboksMapping={
                svarstiTilInformasjonsboksMapping
              }
              disclaimer={disclaimer}
              alert={alert}
            />
          </div>
        </Panel>
      </div>
    );
  } else if (feil) {
    return <Feilside />;
  }

  return null;
};

export default App;
