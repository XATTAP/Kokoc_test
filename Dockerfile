FROM node:20-alpine
COPY ./package.json ./ 
COPY ./tsconfig.json ./ 
COPY ./src ./src 
COPY ./.env ./ 
RUN npm install
EXPOSE ${SERVER_PORT} 
 
CMD ["npm", "run", "start"]