FROM navikt/pus-decorator:228.20190926.1521
ENV APPLICATION_NAME=familie-ef-veiviser
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/familie/alene-med-barn/veiviser/
COPY ./build /app
