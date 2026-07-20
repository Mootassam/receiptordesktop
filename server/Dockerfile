# Use a modern Node version
FROM node:18-alpine


WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install

# Set environment variables
ENV BACKEND_URL="http://72.62.210.173:8083/api"

# Expose your app port
EXPOSE 8083

CMD ["npm", "start"]