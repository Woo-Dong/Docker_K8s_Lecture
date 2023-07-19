FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

# 1. ENTRYPOINT default setting
ENTRYPOINT ["npm", "run"]

# 2. ENTRYPOINT & CMD
# ENTRYPOINT ["npm", "run"]
# CMD ["start:dev"]

# 3. CMD default setting
# CMD ["npm", "run", "start:dev"]