FROM nginx:1.29.1-alpine-slim

COPY docker/default.conf /etc/nginx/conf.d/default.conf.template

COPY dist/ids-angular/browser /usr/share/nginx/html

EXPOSE 80