import path from 'path';
import express from 'express';
import indexHandler from './dekorator.js';
import appEnv from './environment.js';

const app = express();
const port = 8080;

const BASE_PATH = '/familie/alene-med-barn/veiviser';
const byggmappeFrontend = path.join(process.cwd(), 'dist');

app.set('views', byggmappeFrontend);

app.get(`${BASE_PATH}/status`, (_req, res) => {
  res.status(200).end();
});

app.get(`${BASE_PATH}/env`, (_req, res) => {
  res.status(200).send(appEnv).end();
});

app.use(
  `${BASE_PATH}`,
  express.static(path.join(process.cwd(), 'dist'), { index: false })
);

app.get(/^(?!.*\/(internal|static)\/).*$/, indexHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
