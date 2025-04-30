# Step 1: Use an official Node.js image as base
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the project
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# ---- Production image ----
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/src src
COPY --from=builder /app/tsconfig.json ./

# Expose Next.js default port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run","dev"]
