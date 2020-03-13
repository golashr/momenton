FROM mhart/alpine-node:latest

RUN apk add --no-cache --virtual .build-deps \
    git \
    bash \
    curl \
    ca-certificates \
    && update-ca-certificates

RUN mkdir -p /momenton/momentonserver
ADD . /momenton/momentonserver/
WORKDIR /momenton/momentonserver/

RUN npm install

ENTRYPOINT ["tail", "-f", "/dev/null"]
