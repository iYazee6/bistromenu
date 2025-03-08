# Dockerfile snippet
FROM postgres:latest

COPY ./DBScripts/01-Menu.sql /docker-entrypoint-initdb.d/01-menu.sql
COPY ./DBScripts/02-Category.sql /docker-entrypoint-initdb.d/02-category.sql
COPY custom-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["custom-entrypoint.sh"]
CMD ["postgres"]