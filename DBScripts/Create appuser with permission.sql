


create user appuser with password 'P@ssw0rd';

grant all privileges on database bistromenu to appuser;
ALTER ROLE appuser SUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN NOREPLICATION NOBYPASSRLS;


CREATE TABLE public.users (
	id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
	username varchar NULL,
	"password" varchar NULL,
	"role" varchar NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);
