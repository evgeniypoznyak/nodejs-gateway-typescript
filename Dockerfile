# docker build -t evgeniy/node-gateway .
# docker run -p 49150:8080 -d --env-file ./.env --name evgeniy-node-gateway  --network evgeniy_poznyaks_com  evgeniy/node-gateway
FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]