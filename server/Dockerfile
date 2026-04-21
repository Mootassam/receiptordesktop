# Use a modern Node version
FROM node:18-alpine


WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install

# Set environment variables
ENV BACKEND_URL="http://159.198.70.147:8082/api"

# Expose your app port
EXPOSE 8082

CMD ["npm", "start"]