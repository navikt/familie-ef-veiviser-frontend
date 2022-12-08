FROM navikt/node-express:16

ADD ./ /var/server/

EXPOSE 8080

CMD ["node", "server.js"]