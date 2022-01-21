FROM node:17-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/IPRWC-FRONT /usr/share/nginx/html
