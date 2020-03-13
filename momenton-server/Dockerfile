FROM mhart/alpine-node:latest

RUN apk add --no-cache --virtual .build-deps \
    git \
    bash \
    curl \
    ca-certificates \
    && update-ca-certificates

RUN mkdir -p /momenton/momenton-server
ADD . /momenton/momenton-server/
WORKDIR /momenton/momenton-server/

RUN npm install

ENTRYPOINT ["tail", "-f", "/dev/null"]
