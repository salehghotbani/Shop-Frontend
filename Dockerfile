# Stage 1: Build the React app
FROM node:18-alpine AS builder
ENV NODE_ENV production
# Declaring env
ENV NODE_ENV production
# Setting up the work directory
WORKDIR /app
# Installing dependencies
COPY ./package.json ./
RUN npm install
# Copying all the files in our project
COPY . .
# Building our application
RUN npm run build

# Stage 2: Build the Express.js server
FROM node:18-alpine as server
ENV NODE_ENV production
WORKDIR /app
# Copy the server code to the container
COPY ./server /app
# Installing server dependencies
RUN npm install
# Expose the server port
EXPOSE 3001
# Start the server
CMD ["node", "server.js"]

# Stage 3: Create the final production image with nginx
FROM nginx:1.24.0-alpine as production
ENV NODE_ENV production
# Copy built assets from the React app builder stage
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
