FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333 7001

CMD [ "npm", "run", "dev" ]