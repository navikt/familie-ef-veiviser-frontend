FROM navikt/node-express:18

WORKDIR /var/server

COPY dist ./dist
COPY index.html ./index.html
COPY ./src/backend/server.js ./server.js

ADD ./ /var/server/

EXPOSE 8080

CMD ["node", "server.js"]