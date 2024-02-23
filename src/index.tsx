import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import App from './App';
import smoothscroll from 'smoothscroll-polyfill';
import '@navikt/ds-css';
import { createRoot } from 'react-dom/client';

smoothscroll.polyfill();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
