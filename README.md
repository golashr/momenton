# Momenton Movie WebApp

This complete application shows the available new movies in an aggregated fashion while pulling movies data from movie broadcaster providers e.g. Cinema World and Film World. The project contains one microservices e.g. momenton-server and one front end named momenton-client.

It contains a docker-compose file which can be used to deploy the entire application seemlessly on any given box. 

## Getting Started

### Clone the repo and install the project
- git clone https://github.com/golashr/momenton.git
- cd momenton

### Bring up the geth nodes using docker compose
NOTE: If there are existing docker instances (sudo docker ps -a), stop and remove them
```
sudo docker stop $(sudo docker ps -aq)
```

```
sudo docker rm $(sudo docker ps -aq)
```
 
1. Create docker network by running this command
   ```
   docker network create -d bridge --subnet 172.23.240.0/24 --gateway 172.23.240.1 momenton_net

   ```
2. Run the geth nodes by running
   **docker-compose up -d**

3. Go to the momenton app folder 
   - cd momenton
   - npm install
   - yarn build
   - npm start

- Visit [localhost:3000/home](http://localhost:3000/home)