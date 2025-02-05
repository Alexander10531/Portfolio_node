FROM postgres

ENV POSTGRES_PASSWORD=mysecretpassword
ENV PGDATA=/var/lib/postgresql/data/pgdata
VOLUME /custom/mount:/var/lib/postgresql/data

COPY dll.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["docker-entrypoint.sh", "postgres"]