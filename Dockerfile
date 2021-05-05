FROM node:14-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

ENV PATH /home/node/api/node_modules/.bin:$PATH

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN yarn build

EXPOSE 3333

CMD ["yarn", "start"]
