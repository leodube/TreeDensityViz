# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# ensure executables created inside container can be found
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "start"]