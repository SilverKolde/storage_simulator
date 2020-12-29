# Build on an existing node image
FROM node:15

# copy from this projects current folder to docker image's current folder
COPY ./ ./

# install dependencies, build project
RUN npm install
RUN npm run build

# install web server that server incoming requests
RUN npm install -g http-server

# open port for incoming requests
EXPOSE 8080

# start the server
CMD ["http-server", "dist"]