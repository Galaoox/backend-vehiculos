FROM node
WORKDIR /app
COPY . /

RUN yarn
RUN yarn build


COPY . .
EXPOSE 4300
CMD ["yarn", "start:prod"]