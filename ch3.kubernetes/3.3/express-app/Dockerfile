FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

ENTRYPOINT ["npm", "run"]

CMD ["start:dev"]