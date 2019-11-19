FROM node:13 as node

RUN mkdir /app

COPY Makefile ./app/Makefile

WORKDIR /app

COPY package.json package-lock.json ./
COPY ./src /app/src
COPY ./public /app/public

RUN npm ci

ENTRYPOINT ["npm"]
CMD ["start"]
