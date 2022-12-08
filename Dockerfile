FROM navikt/node-express:12.2.0-alpine
ADD ./ /var/server/
USER root
RUN npm ci

EXPOSE 8080

USER apprunner
CMD ["npm", "run", "serve"]
