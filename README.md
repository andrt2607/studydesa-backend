#LEARNING BACKEND

## script build image docker

- docker build -t express-dev/studydesa:1.0.0 -f Dockerfile.dev .

## script run image to container

- docker run -d -p 3000:3000 express-dev/studydesa:1.0.0

## run docker compose

- docker-compose up
