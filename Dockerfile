# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"

# Install dependencies and build the frontend
FROM base AS build-frontend

COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm ci --include=dev
COPY client ./client
RUN cd client && npm run build

# Build the backend
FROM base AS build-backend

COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --include=dev
COPY server ./server
COPY --from=build-frontend /app/client/dist ./server/dist
RUN cd server && npm run build
RUN cd server && npm prune --omit=dev

# Final image
FROM base

COPY --from=build-backend /app/server /app

EXPOSE 8080
CMD [ "npm", "run", "start" ]
