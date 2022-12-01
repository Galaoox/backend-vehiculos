FROM node
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
RUN yarn build
RUN yarn seed:run


COPY . .
EXPOSE 4300
CMD ["yarn", "start:prod"]