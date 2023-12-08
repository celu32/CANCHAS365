## Docker

Build the Docker Image

```docker
docker build --pull --rm -f Dockerfile -t backend:latest .
```

Run the Docker container

```docker
docker run --rm -d -p 8080:8080/tcp frontend:latest
```
