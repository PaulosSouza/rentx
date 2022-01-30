FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333 7001

CMD [ "yarn", "dev" ]