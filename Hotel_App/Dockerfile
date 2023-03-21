FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8080 DB_URL="mongodb://localhost:27017/hotel"

EXPOSE 8080

CMD ["npm", "start"]