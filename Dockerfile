FROM gcr.io/distroless/nodejs20-debian12

USER root
USER apprunner
ENV TZ="Europe/Oslo"
WORKDIR /var/server

COPY dist ./dist
COPY dist-server ./dist-server
COPY index.html ./index.html
COPY node_modules ./node_modules
COPY package.json .

EXPOSE 8080

CMD ["--es-module-specifier-resolution=node", "dist-server/server.js"]