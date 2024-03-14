FROM gcr.io/distroless/nodejs:18
USER root
user apprunner
ENV TZ="Europe/Oslo"
WORKDIR /app
ADD src/assets ./src/assets
ADD src/backend ./src/backend
ADD node_modules ./node_modules
ADD package.json ./
ENV NODE_ENV production
EXPOSE 8080
CMD ["--es-module-specifier-resolution=node", "/app/src/backend/server.js"]
