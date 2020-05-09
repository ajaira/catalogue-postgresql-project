# Stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node app/dist/fronted-catalogue/ /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
COPY frontend.conf /etc/nginx/conf.d
