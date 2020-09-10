# Deployment
# docker build -t evgen1y/node-gateway . && docker push evgen1y/node-gateway
# docker build -t evgen1y/node-gateway .
# docker tag a9aba8b5f982 evgen1y/node-gateway
# docker push evgen1y/node-gateway
# docker run -p 2222:80 -d --env-file ./.env --name evgeniy-node-gateway --network evgeniy_poznyaks_com evgen1y/node-gateway
#--env-file ./.env
# e8c486d204f2
# docker tag e8c486d204f2 evgen1y/node-gateway
FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-ts
EXPOSE 80
CMD [ "node", "./dist/app.js" ]
