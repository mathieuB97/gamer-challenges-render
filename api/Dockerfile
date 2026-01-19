FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
# En mode dev, on installe toutes les dépendances
RUN npm install

COPY . .

EXPOSE 3000

# On utilise nodemon (si installé) ou node --watch pour le dev
CMD ["npm", "run", "dev"]