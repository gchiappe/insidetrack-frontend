FROM node:lts-alpine AS build
LABEL AUTHOR="Giancarlo A. Chiappe Aguilar"
COPY . /src
ARG BACKEND
RUN echo "{\"api\":\"${BACKEND}\"}" > /src/backend.json
WORKDIR /src
RUN yarn
RUN yarn build
FROM python:3.9-alpine
COPY --from=build /src/dist/frontend /frontend/
RUN rm -rf /src
EXPOSE 8000
CMD python3 -m http.server 8000 --directory /frontend
