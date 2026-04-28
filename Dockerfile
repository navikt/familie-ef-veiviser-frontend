FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ENV TZ="Europe/Oslo"
WORKDIR /var/server

COPY dist ./dist
COPY dist-server ./dist-server
COPY index.html ./index.html
COPY node_modules ./node_modules
COPY package.json .

EXPOSE 8080

CMD ["--es-module-specifier-resolution=node", "dist-server/server.js"]