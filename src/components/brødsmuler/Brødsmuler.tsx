import React from 'react';

const Brødsmuler = () => {
    return (
        <div className="brødsmuler">
          <span className="brødsmule-element">
            <a href="https://nav.no">Forside</a>
          </span>{' '}
            /{' '}
            <span className="brødsmule-element">
            <a href="https://www.nav.no/no/person/familie/enslig-mor-eller-far">
              Enslig mor eller far
            </a>
          </span>{' '}
            / <span className="brødsmule-element">Hva kan du få?</span>
        </div>
    )
};

export default Brødsmuler;
