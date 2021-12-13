FROM node:17.2.0
# COPY . ./app
# WORKDIR /app
# RUN npm install
# CMD npm run dev
RUN apt-get update && apt-get install -y git