FROM node
WORKDIR /app
COPY . /

RUN yarn
RUN yarn build


COPY . .
EXPOSE 80
CMD ["yarn", "start:prod"]