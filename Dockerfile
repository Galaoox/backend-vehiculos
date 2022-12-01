FROM node
WORKDIR /app
COPY . /

RUN yarn
RUN yarn build
RUN yarn seed:run


COPY . .
EXPOSE 4300
CMD ["yarn", "start:prod"]