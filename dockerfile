# Define node version
FROM node:12.16.1-alpine
# Define container directory
WORKDIR /usr/src/app
# Copy all files
COPY . .
RUN rm package-lock.json
RUN npm install --legacy-peer-deps
# Expose port 8080 for server
EXPOSE 8080
# Run "node server/run.js"
CMD ["node", "app.js"]