FROM alpine as build-stage
RUN apk update && apk add --update nodejs npm && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.build.json /app/tsconfig.build.json
COPY package-lock.json /app/package-lock.json
RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm install --silent \
 && apk del .build-deps
COPY ormconfig.js /app/ormconfig.js
COPY src /app/src
RUN npm run build

# production stage
FROM alpine as production-stage
RUN apk update && apk add nodejs npm python && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY ormconfig.js /app/ormconfig.js
COPY assets /app/assets
RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm install --only=prod --silent \
 && apk del .build-deps
COPY --from=build-stage /app/dist /app/dist
RUN mkdir /app/temp && mkdir /app/temp/upload
CMD ["node", "dist/main.js"]