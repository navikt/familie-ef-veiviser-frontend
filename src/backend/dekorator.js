import * as dekorator from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import path from 'path';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const indexHandler = (_, res) => {
  dekorator
    .injectDecoratorServerSide({
      env: env,
      filePath: `${path.join(process.cwd(), 'dist')}/index.html`,
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
export default indexHandler;
