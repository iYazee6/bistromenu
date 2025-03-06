# Stage 1: Build the Vite React App
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first (better caching)
COPY bistro-menu-app/package.json bistro-menu-app/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY bistro-menu-app .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine AS runner

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx files
RUN rm -rf ./*

# Copy built files from the builder stage
COPY --from=builder /app/dist .

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]