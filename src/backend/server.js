import path from 'path';
import express from 'express';
import indexHandler from './dekorator.js';

const app = express();
const port = 8080;

app.set('views', path.join(process.cwd(), 'dist'));

app.use(express.static(path.join(process.cwd(), 'dist'), { index: false }));

app.get('/status', (_req, res) => {
  res.status(200).end();
});

app.use(/^(?!.*\/(internal|static)\/).*$/, indexHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
