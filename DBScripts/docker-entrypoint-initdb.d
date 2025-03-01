# Dockerfile snippet
FROM postgres:latest
COPY ./DBScripts/dump.sql /docker-entrypoint-initdb.d/
COPY custom-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["custom-entrypoint.sh"]
CMD ["postgres"]