# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Libraries

- [Material-ui](https://mui.com/material-ui/)
- [React-Router](https://reactrouter.com/en/main)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Jest](https://jestjs.io/)
- [Formik - Yup](https://formik.org/docs/overview)
- Node 18.18
- React 18

## Docker

Build the Docker Image

```docker
docker build --pull --rm -f Dockerfile -t frontend:latest .
```

Run the Docker container

```docker
docker run --rm -d -p 5173:5173/tcp frontend:latest
```
