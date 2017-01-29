# Create image based on the official Node  image from the dockerhub
FROM node:7

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
ENTRYPOINT ["npm", "start"]