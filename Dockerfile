# build stage
FROM node:14 as build-stage
WORKDIR /app/front-end
COPY ./front-end/package*.json ./
RUN npm install
COPY ./front-end .
RUN npm run build --prod

# production stage
FROM node:lts-alpine as production-stage
WORKDIR /app/back-end
COPY --from=build-stage /app/front-end/dist /app/back-end/dist
COPY ./back-end/package*.json ./
RUN npm install
COPY ./back-end . 

CMD [ "node", "start" ]
