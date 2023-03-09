FROM navikt/node-express:18

ADD ./ /var/server/

EXPOSE 8080

CMD ["node", "server.js"]