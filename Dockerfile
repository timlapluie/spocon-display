FROM node

WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
RUN npm install
COPY . /app

CMD ["npm", "start"]
