import dekorator from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 8080;

const BASE_PATH = '/familie/alene-med-barn/veiviser';
const byggmappeFrontend = path.join(process.cwd(), 'dist');

const indexHandler = (_: Request, res: Response): void => {
  dekorator
    .injectDecoratorServerSide({
      env: process.env.ENV === 'production' ? 'prod' : 'dev',
      filePath: `${path.join(process.cwd(), 'dist')}/index.html`,
    })
    .then((html: string) => {
      res.send(html);
    })
    .catch((e: Error) => {
      console.log(e);
      const error = `En feil oppstod. Klikk <a href='https://www.nav.no'>her</a> for å gå tilbake til nav.no. Kontakt kundestøtte hvis problemet vedvarer.`;
      res.status(500).send(error);
    });
};

app.set('views', byggmappeFrontend);

app.get(`${BASE_PATH}/status`, (_req: Request, res: Response) => {
  res.status(200).end();
});

app.use(
  `${BASE_PATH}`,
  express.static(path.join(process.cwd(), 'dist'), { index: false })
);

app.get(/^(?!.*\/(internal|static)\/).*$/, indexHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
