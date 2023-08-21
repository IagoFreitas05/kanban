FROM node:18
COPY package*.json yarn.lock ./
RUN npm install yarn
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 5000
CMD ["yarn", "start"]
