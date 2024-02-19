FROM gcr.io/distroless/nodejs:18
USER root
user apprunner
ENV TZ="Europe/Oslo"
WORKDIR /app
COPY src/assets /app/src/assets
COPY src/backend /app/src/backend
COPY node_modules /app/node_modules
COPY package.json /app/
EXPOSE 8080
CMD ["--es-module-specifier-resolution=node", "/app/src/backend/server.js"]
