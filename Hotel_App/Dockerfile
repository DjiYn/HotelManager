FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=5000 DB_URL="mongodb://mongo:27017/hotel"

EXPOSE 5000

CMD ["npm", "start"]