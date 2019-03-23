FROM node:8.11.3-slim
WORKDIR /lss
COPY . /lss
EXPOSE 3000
CMD [ "npm", "start" ]