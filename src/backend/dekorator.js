const dekorator = require('@navikt/nav-dekoratoren-moduler/ssr');
const path = require('path');

const env = import.meta.env.VITE_ENV === 'development' ? 'dev' : 'prod';

const indexHandler = (_, res) => {
  dekorator
    .injectDecoratorServerSide({
      env: env,
      filePath: `${path.join(process.cwd(), 'build')}/index.html`,
    })
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      console.log(e);
      const error = `En feil oppstod. Klikk <a href='https://www.nav.no'>her</a> for å gå tilbake til nav.no. Kontakt kundestøtte hvis problemet vedvarer.`;
      res.status(500).send(error);
    });
};
module.exports = indexHandler;
