import React, { useState, useEffect } from 'react';
import Sporsmal from './components/Sporsmal';
import Informasjonstekst from './components/Informasjonstekst';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Feilside from './components/Feilside';
import Header from './components/Header';
import { Panel } from 'nav-frontend-paneler';
import { client } from './utils/sanity';

const App = () => {

    const [sporsmalListe, settSporsmalListe] = useState<any>([]);
    const [ferdig, settFerdig] = useState<boolean>(false);
    const [steg, settSteg] = useState<number>(1);
    const [fetching, settFetching] = useState<boolean>(true);
    const [error, settError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = () => {
            client
                .fetch(
                    '*[_type == $type]',
                    {type: 'question'}
                )
                .then((res: any) => {
                    settSporsmalListe(res);
                })
                .catch((err: any) => {
                    console.error('Oh no, error occured: ', err);
                    settError(true);
                });

            settFetching(false);
        };

        fetchData();
    }, []);

    if (fetching) {
        return (
            <NavFrontendSpinner className="spinner" />
        )
    }

    if (!error && sporsmalListe && sporsmalListe.length) {
            return (
                <div className="app">
                    <Panel className="innholdspanel">
                        <div className="innholdscontainer">
                        <Header />
                            {ferdig ?
                                <Informasjonstekst
                                    steg={steg}
                                /> :
                                <Sporsmal
                                    sporsmalListe={sporsmalListe}
                                    settSteg={settSteg}
                                    settFerdig={settFerdig}
                                    steg={steg}
                                />}
                        </div>
                    </Panel>
                </div>
    );
    } else if (error) {
        return <Feilside />
    }

    return null;
};

export default App;
