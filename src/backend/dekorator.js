const dekorator = require('@navikt/nav-dekoratoren-moduler/ssr');
const path = require('path');
const {appEnv} = require("../utils/env");

const indexHandler = (_, res) => {
  dekorator
    .injectDecoratorServerSide({
      env: appEnv.env,
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
