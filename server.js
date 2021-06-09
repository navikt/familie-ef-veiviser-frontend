var path = require('path');
const express = require('express');
const jsdom = require('jsdom');
const request = require('request');
const mustacheExpress = require('mustache-express');
const app = express();
const port = 8080;
const router = express.Router();
router.use(express.static(path.join(__dirname, 'build')));
const { JSDOM } = jsdom;

app.set('views', `${__dirname}/build`);
app.set('view engine', 'mustache');
app.engine('html', mustacheExpress());

const getDecorator = () =>
  new Promise((resolve, reject) => {
    request(
      'https://www.nav.no/dekoratoren/?feedback=false',
      (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
          const { document } = new JSDOM(body).window;
          const prop = 'innerHTML';
          const data = {
            HEADER: document.getElementById('header-withmenu')[prop],
            STYLES: document.getElementById('styles')[prop],
            FOOTER: document.getElementById('footer-withmenu')[prop],
            SCRIPTS: document.getElementById('scripts')[prop],
          };
          resolve(data);
        } else {
          reject(new Error(error));
        }
      }
    );
  });

router.get('/status', (req, res) => {
  res.status(200).end();
});
app.get('/status', (req, res) => {
  res.status(200).end();
});

router.get('/health/isAlive', (req, res) => res.sendStatus(200));
router.get('/health/isReady', (req, res) => res.sendStatus(200));

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  getDecorator()
    .then((fragments) => {
      res.render('index.html', fragments);
    })
    .catch((e) => {
      const error = `Failed to get decorator: ${e}`;
      res.status(500).send(error);
    })
);

app.use('/familie/alene-med-barn/veiviser', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
