FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Commande typique pour Vite, React ou Vue en dev
CMD ["npm", "run", "dev"]