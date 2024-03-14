FROM gcr.io/distroless/nodejs:18

USER root
user apprunner
ENV TZ="Europe/Oslo"

WORKDIR /app

ADD src/assets ./src/assets
ADD src/backend ./src/backend
ADD src/components ./src/components
ADD src/models ./src/models
ADD src/navikt-components ./src/navikt-components
ADD src/utils ./src/utils

ADD node_modules ./node_modules
ADD package.json ./
ADD build ./build

ENV NODE_ENV production

EXPOSE 8080
CMD ["--es-module-specifier-resolution=node", "/app/src/backend/server.js"]
