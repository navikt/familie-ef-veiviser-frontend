FROM navikt/node-express:12.2.0-alpine
RUN apk --no-cache add curl
ADD ./ /var/server/
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]