FROM gcr.io/distroless/nodejs20-debian12

USER root
user apprunner
ENV TZ="Europe/Oslo"
WORKDIR /var/server

COPY dist ./dist
COPY index.html ./index.html
COPY ./src/backend/server.js ./server.js
COPY node_modules ./node_modules
COPY package.json .

EXPOSE 8080

CMD ["--es-module-specifier-resolution=node", "server.js"]