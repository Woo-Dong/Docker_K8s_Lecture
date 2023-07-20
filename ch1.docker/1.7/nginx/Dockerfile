FROM nginx:alpine

# FILL HERE
ENV API_HOST=172.17.0.2
ENV API_PORT=3000

COPY nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

RUN envsubst < /etc/nginx/conf.d/default.conf.template > etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]