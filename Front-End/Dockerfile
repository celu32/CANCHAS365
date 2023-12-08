### Stage 1
FROM node:lts-bullseye as build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . .
RUN npm run build

### Stage 2
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app/
ENV VITE_BACKEND_API="http://localhost:8080/"
EXPOSE 5173

CMD ["nginx","-g","daemon off;"]