FROM nginx:alpine

# FILL HERE
ENV API_HOST=XXX.XXX.XXX.XXX
ENV API_PORT=XXXX

COPY nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

RUN envsubst < /etc/nginx/conf.d/default.conf.template > etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]