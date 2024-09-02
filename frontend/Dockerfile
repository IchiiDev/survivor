FROM node:20.12

COPY . .

# Install dependencies

RUN npm install
RUN npm install -g serve

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
CMD ["serve", "build"]
