# syntax=docker/dockerfile:1

FROM node:16.15.0

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Update npm
RUN npm install npm
RUN rm -rf /usr/local/lib/node_modules/npm
RUN mv node_modules/npm /usr/local/lib/node_modules/npm

# Install packages
RUN npm install --production

# Copy the app code
COPY . .

# Build the project
RUN npm run build

# Expose ports
# EXPOSE 8080

# Run the application
CMD [ "node", "dist/start-bot.js" ]
