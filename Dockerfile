
FROM node:12

ENV NODE_ENV=production

RUN apt-get update \
    && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml

RUN yarn

COPY . .

EXPOSE 3001

CMD ["node", "./app/index.js"]