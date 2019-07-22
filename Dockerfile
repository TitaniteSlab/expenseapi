# Build + Test Stage
FROM phusion/passenger-nodejs:1.0.1 as builder

ARG NPM_TOKEN

WORKDIR /home/app/api

COPY . .
RUN npm install && npm run build && npm test

# Final Stage
FROM phusion/passenger-nodejs:1.0.1

WORKDIR /home/app/api

COPY . .
COPY --from=builder /home/app/api/build build
RUN rm -rf src config build/**/*.test.js
RUN npm install --production

ADD nginx.conf /etc/nginx/sites-enabled/webapp.conf
RUN rm -f /etc/service/nginx/down .npmrc .babelrc nginx.conf package-lock.json

EXPOSE 8082

CMD ["/sbin/my_init"]
