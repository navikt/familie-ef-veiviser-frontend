FROM gcr.io/distroless/nodejs20-debian12

USER root
user apprunner
ENV TZ="Europe/Oslo"
WORKDIR /var/server

COPY dist ./dist
COPY index.html ./index.html
COPY ./src/backend/server.ts ./server.ts
COPY node_modules ./node_modules
COPY package.json .

RUN npm install -g ts-node

EXPOSE 8080

CMD ["ts-node", "--esm", "server.ts"]