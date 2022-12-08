FROM navikt/node-express:16

ADD ./ /var/server/

EXPOSE 8080

CMD ["NODE_ENV=production", "node", "server.js"]