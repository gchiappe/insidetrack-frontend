FROM node:lts-alpine AS build
LABEL AUTHOR="Giancarlo A. Chiappe Aguilar"
COPY . /ngsrc
WORKDIR /ngsrc
ARG BACKEND
RUN echo "{\"api\":\"${BACKEND}\"}" > /src/backend.json
RUN yarn
RUN yarn build
FROM python:3.9-alpine
COPY --from=build /ngsrc/dist/frontend /frontend/
RUN rm -rf /ngsrc
EXPOSE 8000
CMD python3 -m http.server 8000 --directory /frontend
