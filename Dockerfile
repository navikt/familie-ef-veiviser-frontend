FROM navikt/node-express:16


ADD ./ /var/server/
USER root
RUN apk add --update npm

ADD ./ /var/server/
USER root
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN
RUN npm ci

EXPOSE 8080

USER apprunner
CMD ["npm", "run", "serve"]
