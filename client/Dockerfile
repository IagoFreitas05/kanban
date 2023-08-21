FROM node:18
COPY package*.json yarn.lock ./
RUN npm install yarn
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "serve"]
