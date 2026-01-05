# Multi-stage Dockerfile for Coding Interview Platform
# Builds both frontend and backend in a single container

# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install client dependencies
RUN npm ci --only=production

# Copy client source
COPY client/ ./

# Build the frontend
RUN npm run build

# Stage 2: Setup the backend and serve everything
FROM node:18-alpine AS production

WORKDIR /app

# Copy server package files
COPY server/package*.json ./server/

# Install server dependencies
WORKDIR /app/server
RUN npm ci --only=production

# Copy server source
COPY server/ ./

# Copy built frontend from previous stage
COPY --from=frontend-build /app/client/dist ./public

# Expose ports
# 5000 for backend API and WebSocket
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the server
CMD ["node", "index.js"]
