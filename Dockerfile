# docker build -t evgeniy/node-gateway .
# docker run -p 2222:80 -d --env-file ./.env --name evgeniy-node-gateway --network evgeniy_poznyaks_com evgeniy/node-gateway
#--env-file ./.env
FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-ts
EXPOSE 80
CMD [ "node", "./dist/app.js" ]
