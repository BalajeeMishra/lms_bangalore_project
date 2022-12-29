FROM node:14.16.1
WORKDIR /frontend
COPY . .
RUN rm -rf Dockerfile
RUN rm -rf Dockerfile.dev
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
