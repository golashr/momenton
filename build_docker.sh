#!/bin/bash
echo "Building momenton-server service docker image"
cd momenton-server
sudo docker build . -t golra03/momentonserver:latest -t golra03/momentonserver:v1.1 

echo "pushing momenton-client service docker image to the Docker hub"
sudo docker push golra03/momentonserver:latest
sudo docker push golra03/momentonserver:v1.1