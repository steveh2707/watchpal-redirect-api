FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application source
COPY . .

# Expose port (change as needed)
EXPOSE 3000

# Start application
CMD ["node", "index.js"]