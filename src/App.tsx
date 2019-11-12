import React, { useState, useEffect, useRef } from 'react';
import Sporsmal from './components/sporsmal/Sporsmal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './components/feilside/Feilside';
import Header from './components/header/Header';
import { Panel } from 'nav-frontend-paneler';
import { client } from './utils/sanity';
import { Knapp } from 'nav-frontend-knapper';
import { IInfoMapping, ISporsmal } from './models/Sporsmal';
import { scrollTilRef } from './utils/utils';

const App = () => {
  const [sporsmalListe, setSporsmalListe] = useState<ISporsmal[]>([]);
  const [ferdig, setFerdig] = useState<boolean>(false);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [steg, setSteg] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [infoMapping, setInfoMapping] = useState<IInfoMapping[]>([]);
  const [startet, setStartet] = useState<boolean>(false);
  const scrollPunkt = useRef(null);

  const sporsmalQuery =
    '*[_type == $type]{sporsmal_id, sporsmal_tekst, hjelpetekst_overskrift, hjelpetekst, svarliste[]->, _createdAt, _id, _rev, _type, _updatedAt}';

  const infoMappingQuery =
    '*[_type == $type]{information_id, svarsti[]->{_id, tekst}}';

  const disclaimerQuery = '*[_type == $type][0]';

  useEffect(() => {
    const fetchInfoMapping = () => {
      client
        .fetch(infoMappingQuery, {
          type: 'informasjonsboks',
        })
        .then((res: IInfoMapping[]) => {
          setInfoMapping(res);
        })
        .catch((err: Error) => {
          console.log('err', err);
          console.error('Oh no, error occured: ', err);
        });
    };

    const fetchSporsmal = () => {
      client
        .fetch(sporsmalQuery, { type: 'sporsmal' })
        .then((res: ISporsmal[]) => {
          setSporsmalListe(res);
        })
        .catch((err: Error) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });

      setFetching(false);
    };

    const fetchDisclaimer = () => {
      client
        .fetch(disclaimerQuery, { type: 'disclaimer' })
        .then((res: any) => {
          setDisclaimer(res.disclaimer);
        })
        .catch((err: Error) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });
    };

    fetchSporsmal();
    fetchInfoMapping();
    fetchDisclaimer();
  }, []);

  const startVeiviser = () => {
    setStartet(true);
    setTimeout(() => scrollTilRef(scrollPunkt), 120);
  };

  if (fetching) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (!error && sporsmalListe && sporsmalListe.length) {
    return (
      <div className="app">
        <Panel className="innholdspanel">
          <div className="innholdscontainer">
            <Header />
            {!startet ? (
              <div className="knappwrapper">
                <Knapp className="startknapp" onClick={startVeiviser}>
                  Start veiviseren
                </Knapp>
              </div>
            ) : null}
            <Sporsmal
              scrollPunkt={scrollPunkt}
              startet={startet}
              sporsmalListe={sporsmalListe}
              setSteg={setSteg}
              setFerdig={setFerdig}
              ferdig={ferdig}
              steg={steg}
              infoMapping={infoMapping}
              disclaimer={disclaimer}
            />
          </div>
        </Panel>
      </div>
    );
  } else if (error) {
    return <Feilside />;
  }

  return null;
};

export default App;
