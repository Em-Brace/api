FROM node:10.16.3

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
WORKDIR /app
COPY .env.example .env
CMD npm run dev
EXPOSE 5000