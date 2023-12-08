FROM nginx:stable-alpine-perl

LABEL cc.allio.uno.turbo.author=jiangw1027@gmail.com

COPY dist/  /usr/share/nginx/html/

EXPOSE 8900

CMD ["nginx", "-g", "daemon off;"]
