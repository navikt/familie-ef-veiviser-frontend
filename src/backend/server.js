var path = require('path');
const express = require('express');
const indexHandler = require('./dekorator');
const app = express();
const port = 8080;
const router = express.Router();

app.set('views', path.join(process.cwd(), 'build'));

router.use(express.static(path.join(process.cwd(), 'dist'), { index: false }));

router.get('/status', (req, res) => {
  res.status(200).end();
});

app.get('/status', (req, res) => {
  res.status(200).end();
});

app.use(/^(?!.*\/(internal|static)\/).*$/, indexHandler);

app.use('/familie/alene-med-barn/veiviser', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
