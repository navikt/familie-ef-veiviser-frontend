FROM navikt/node-express:16


ADD ./ /var/server/
USER root
RUN mkdir .npm && chmod -R a+rwx .npm

ADD ./ /var/server/
USER root
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN
RUN npm ci

EXPOSE 8080

USER apprunner
CMD ["npm", "run", "serve"]
