# Use a modern Node version
FROM node:18-alpine


WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install

# Set environment variables
ENV BACKEND_URL="http://159.198.70.147:8083/api"

# Expose your app port
EXPOSE 8083

CMD ["npm", "start"]