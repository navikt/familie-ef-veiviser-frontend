import React, { useState, useEffect } from 'react';
import Sporsmal from './components/sporsmal/Sporsmal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './components/feilside/Feilside';
import Header from './components/header/Header';
import { Panel } from 'nav-frontend-paneler';
import { client } from './utils/sanity';

const App = () => {
  const [sporsmalListe, setSporsmalListe] = useState<any>([]);
  const [ferdig, setFerdig] = useState<boolean>(false);
  const [steg, setSteg] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [infoMapping, setInfoMapping] = useState<any>();

  const sporsmalQuery =
    '*[_type == $type]{sporsmal_id, sporsmal_tekst, svarliste[]->, _createdAt, _id, _rev, _type, _updatedAt}';

  const infoMappingQuery =
    '*[_type == $type]{information_id, svarsti[]->{_id, tekst}}';

  useEffect(() => {
    const fetchInfoMapping = () => {
      client
        .fetch(infoMappingQuery, {
          type: 'informasjonsboks',
        })
        .then((res: any) => {
          setInfoMapping(res);
        })
        .catch((err: any) => {
          console.error('Oh no, error occured: ', err);
        });
    };

    const fetchSporsmal = () => {
      client
        .fetch(sporsmalQuery, { type: 'sporsmal' })
        .then((res: any) => {
          setSporsmalListe(res);
        })
        .catch((err: any) => {
          console.error('Oh no, error occured: ', err);
          setError(true);
        });

      setFetching(false);
    };

    fetchSporsmal();
    fetchInfoMapping();
  }, []);

  if (fetching) {
    return <NavFrontendSpinner className="spinner" />;
  }

  if (!error && sporsmalListe && sporsmalListe.length) {
    return (
      <div className="app">
        <Panel className="innholdspanel">
          <div className="innholdscontainer">
            <Header />
            <Sporsmal
              sporsmalListe={sporsmalListe}
              setSteg={setSteg}
              setFerdig={setFerdig}
              ferdig={ferdig}
              steg={steg}
              infoMapping={infoMapping}
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
