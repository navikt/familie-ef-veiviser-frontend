import React, { useState } from 'react';
import 'react-day-picker/lib/style.css';

interface InformasjonstekstProps {
    steg: number
}

const Informasjonstekst: React.FC<InformasjonstekstProps> = ({ steg }) => {
    if (steg > 100) {
        return (
            <>
                <h3>Du kan ha rett til</h3>
            </>
        );
    } else {
        return null;
    }
};

export default Informasjonstekst;
