import React from 'react';

const Brødsmuler = () => {
    return (
        <div className="brødsmuler">
          <span className="brødsmule-element">
            <a href="https://nav.no" target="_blank" rel="noopener noreferrer">Forside</a>
          </span>{' '}
            /{' '}
            <span className="brødsmule-element">
            <a href="https://www.nav.no/no/Person/Familie/Enslig+mor+eller+far/alene-med-barn-hva-n%C3%A5/alene-med-barn" rel="noopener noreferrer">
              Alene med barn
            </a>
          </span>{' '}
            / <span className="brødsmule-element">Hva kan du få?</span>
        </div>
    )
};

export default Brødsmuler;
