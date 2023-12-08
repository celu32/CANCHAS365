# ProyectoFInal-DigitalHouse

## Docker Front End

> cd Front-End/

Build the Docker Image

```docker
docker build --pull --rm -f Dockerfile -t frontend:latest .
```

Run the Docker container

```docker
docker run --rm -d -p 5173:5173/tcp frontend:latest
```

## Docker Back End

> cd Back-End/canchas365/

Build the Docker Image

```docker
docker build --pull --rm -f Dockerfile -t backend:latest .
```

Run the Docker container

```docker
docker run --rm -d -p 8080:8080/tcp backend:latest
```

## Docker Compose (Front && Back)

# Start

```docker
docker compose up
```

# End

```docker
docker compose down
```
