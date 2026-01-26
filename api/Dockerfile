FROM node:lts-alpine

WORKDIR /usr/src/app


COPY package*.json ./
# On force l'installation des dépendances y compris dev
RUN npm install --include=dev

COPY . .

EXPOSE 3000

# On utilise nodemon (si installé) ou node --watch pour le dev
CMD ["npm", "run", "dev"]