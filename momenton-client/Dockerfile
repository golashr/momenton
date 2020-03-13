FROM node:8 as react-build
RUN apt-get update \
  && apt-get install -y curl

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts -g
COPY . /usr/src/app
RUN chmod 755 -R /usr/src/app/node_modules/.bin/webpack
RUN yarn build

FROM nginx:1.13.12-alpine
RUN apk --no-cache add curl  
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /usr/src/app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]