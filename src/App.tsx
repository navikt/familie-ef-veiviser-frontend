import React, { useState } from 'react';
import Sporsmal from './components/Sporsmal';
import Informasjonstekst from './components/Informasjonstekst';

const App = () => {

    const [ferdig, settFerdig] = useState<boolean>(false);
    const [steg, settSteg] = useState<number>(1);

    return (
        <div className="app">
            <div className="innholdscontainer">
                {ferdig ?
                    <Informasjonstekst
                        steg={steg}
                    /> :
                    <Sporsmal
                        settSteg={settSteg}
                        settFerdig={settFerdig}
                        steg={steg}
                    />}
            </div>
        </div>
    );
};

export default App;
