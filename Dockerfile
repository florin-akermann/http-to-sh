FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
# Uncomment the below to install jq in image
#RUN apt-get update \
#    && apt-get install -y jq
CMD [ "node", "app.js" ]