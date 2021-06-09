FROM navikt/node-express:12.2.0-alpine

ADD ./ /var/server/

EXPOSE 8080
CMD ["yarn", "start"]
