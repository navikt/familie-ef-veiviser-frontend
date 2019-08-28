FROM navikt/node-express:1.0.0

ENV APPLICATION_NAME=familie-ef-veiviser
COPY ./build /app
