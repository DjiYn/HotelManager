FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=80 DB_URL="mongodb://mongo:27017/hotel" HOST="localhost"

EXPOSE 80

CMD ["npm", "start"]