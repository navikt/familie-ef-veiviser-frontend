import dekorator from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import express, { Request, Response, Express } from 'express';
import path from 'path';

const app = express();
const port = 8080;

const BASE_PATH = '/familie/alene-med-barn/veiviser';
const byggmappeFrontend = path.join(process.cwd(), 'dist');

app.get(['/isAlive', 'isReady'], (_req: Request, res: Response) => {
  res.status(200).send('Alive');
});

const indexHandler = (req: Request, res: Response): void => {
  if (Object.keys(req.query).length > 0) {
    res.status(403).send('Forbidden Access.');
  }

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

const indexFallback = (express: Express) => {
  express.get(`${BASE_PATH}`, indexHandler);
  return app;
};

app.set('views', byggmappeFrontend);

app.use(
  `${BASE_PATH}`,
  express.static(path.join(process.cwd(), 'dist'), { index: false })
);

indexFallback(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
