FROM navikt/node-express:12.2.0-alpine
RUN apk --no-cache add curl
ADD ./ /var/server/
RUN yarn
RUN yarn build

EXPOSE 8080
CMD ["yarn", "serve"]

#FROM navikt/pus-decorator:228.20190926.1521
#ENV APPLICATION_NAME=familie-ef-navno
#ENV HEADER_TYPE=WITHOUT_MENU
#ENV CONTEXT_PATH=/familie/alene-med-barn/soknad/
#COPY ./build /app