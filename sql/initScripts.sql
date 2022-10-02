CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

CREATE SCHEMA IF NOT EXISTS secret_vault;



-- Table: secret_vault.namespaces

-- DROP TABLE IF EXISTS secret_vault.namespaces;

CREATE TABLE IF NOT EXISTS secret_vault.namespaces
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(32) NOT NULL,
    accessProfile character varying NOT NULL,
    inserted timestamp with time zone NOT NULL,
    CONSTRAINT namespaces_pkey PRIMARY KEY (uuid),
    CONSTRAINT namespace_unique UNIQUE (name)
)

TABLESPACE pg_default;



-- Table: secret_vault.applications

-- DROP TABLE IF EXISTS secret_vault.applications;

CREATE TABLE IF NOT EXISTS secret_vault.applications
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(32) NOT NULL,
    owner_name character varying NOT NULL,
    owner_email character varying NOT NULL,
    ns_uuid uuid NOT NULL,
    inserted timestamp with time zone NOT NULL,
    CONSTRAINT applications_pkey PRIMARY KEY (uuid)
)

TABLESPACE pg_default;



-- Table: secret_vault.environments

-- DROP TABLE IF EXISTS secret_vault.environments;

CREATE TABLE IF NOT EXISTS secret_vault.environments
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    api_key character varying(137) NOT NULL,
    api_key_hash character(64) NOT NULL,
    app_uuid uuid NOT NULL,
    archetype uuid NOT NULL,
    name character varying(16) NOT NULL,
    inserted timestamp with time zone NOT NULL,
    CONSTRAINT environments_pkey PRIMARY KEY (uuid)
)

TABLESPACE pg_default;



-- Table: secret_vault.secrets

-- DROP TABLE IF EXISTS secret_vault.secrets;

CREATE TABLE IF NOT EXISTS secret_vault.secrets
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    api_key character varying(137) NOT NULL,
    api_key_hash character(64) NOT NULL,
    name character varying(32)  NOT NULL,
    owner_name character varying NOT NULL,
    owner_email character varying NOT NULL,
    username character varying(128) NOT NULL,
    password character(128) NOT NULL,
    expiration_date date NOT NULL,
    inserted timestamp with time zone NOT NULL,
    CONSTRAINT secrets_pkey PRIMARY KEY (uuid)
)

TABLESPACE pg_default;



-- Table: secret_vault.x_reference

-- DROP TABLE IF EXISTS secret_vault.x_reference;

CREATE TABLE IF NOT EXISTS secret_vault.x_reference
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    ns_uuid uuid NOT NULL,
    env_uuid uuid NOT NULL,
    secret_uuid uuid NOT NULL,
    inserted timestamp with time zone NOT NULL,
    CONSTRAINT x_reference_pkey PRIMARY KEY (uuid)
)

TABLESPACE pg_default;



-- Table: secret_vault.tags

-- DROP TABLE IF EXISTS secret_vault.tags;

CREATE TABLE IF NOT EXISTS secret_vault.tags
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    kv character varying(16) NOT NULL,
    secret_uuid uuid NOT NULL,
    inserted timestamp with time zone NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (uuid)
)

TABLESPACE pg_default;



-- View: secret_vault.secrets_main

-- DROP VIEW secret_vault.secrets_main;

CREATE OR REPLACE VIEW secret_vault.secrets_main_v1
 AS
 SELECT a.uuid,
    a.name,
    a.api_key::text AS api_key,
    a.owner_name,
    a.owner_email,
    a.username,
    a.password,
    a.expiration_date::text AS expiration_date,
    a.inserted,
    ( SELECT ARRAY( SELECT x_reference.ns_uuid
                   FROM secret_vault.x_reference
                  WHERE x_reference.secret_uuid = a.uuid) AS "array") AS namespaces,
    ( SELECT ARRAY( SELECT x_reference.env_uuid
                   FROM secret_vault.x_reference
                  WHERE x_reference.secret_uuid = a.uuid) AS "array") AS environments,
    ( SELECT ARRAY( SELECT tags.kv
                   FROM secret_vault.tags
                  WHERE tags.secret_uuid = a.uuid) AS "array") AS tags
   FROM secret_vault.secrets a;



-- View: secret_vault.secrets_main_v2

-- DROP VIEW secret_vault.secrets_main_v2;

-- environment_names added

CREATE OR REPLACE VIEW secret_vault.secrets_main_v2
 AS
 SELECT a.name,
    a.api_key::text AS api_key,
    a.owner_name,
    a.owner_email,
    a.username,
    a.password,
    a.expiration_date::text AS expiration_date,
    ( SELECT ARRAY( SELECT CONCAT(namespaces.name, '$sep:',applications.name, '$sep:',environments.name, '$sep:', environments.archetype)
                   FROM secret_vault.x_reference
                   JOIN secret_vault.environments
                   ON environments.uuid = x_reference.env_uuid
                   JOIN secret_vault.applications
                   ON applications.uuid = environments.app_uuid
                   JOIN secret_vault.namespaces
                    ON namespaces.uuid = x_reference.ns_uuid
                  WHERE x_reference.secret_uuid = a.uuid
                  ORDER BY namespaces.name, applications.name, environments.name) AS "array") AS environments
   FROM secret_vault.secrets a;



-- View: secret_vault.applications_v1

-- DROP VIEW secret_vault.applications_v1;

CREATE OR REPLACE VIEW secret_vault.applications_overview_v1
 AS
 SELECT a.name,
    ( SELECT namespaces.name
           FROM secret_vault.namespaces
          WHERE namespaces.uuid = a.ns_uuid) AS namespace,
    a.owner_name,
    a.owner_email,
    ( SELECT ARRAY(
        SELECT CONCAT(environments.uuid, '$sep:',environments.name, '$sep:', environments.archetype, '$sep:', secrets.name)
            FROM secret_vault.secrets
            JOIN secret_vault.x_reference
            ON x_reference.secret_uuid = secrets.uuid
            JOIN secret_vault.environments
            ON x_reference.env_uuid = environments.uuid
            WHERE environments.app_uuid = a.uuid
            ORDER BY environments.name, secrets.name) AS "array") AS secrets
   FROM secret_vault.applications a;



-- Timestamps

CREATE OR REPLACE FUNCTION secret_vault.namespaces_stamp() RETURNS trigger AS $namespaces_stamp$
    BEGIN
        NEW.inserted := current_timestamp;
        RETURN NEW;
    END;
$namespaces_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER  namespaces_stamp BEFORE INSERT ON secret_vault.namespaces
    FOR EACH ROW EXECUTE PROCEDURE secret_vault.namespaces_stamp();



CREATE OR REPLACE FUNCTION secret_vault.applications_stamp() RETURNS trigger AS $applications_stamp$
    BEGIN
        NEW.inserted := current_timestamp;
        RETURN NEW;
    END;
$applications_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER  applications_stamp BEFORE INSERT ON secret_vault.applications
    FOR EACH ROW EXECUTE PROCEDURE secret_vault.applications_stamp();



CREATE OR REPLACE FUNCTION secret_vault.environments_stamp() RETURNS trigger AS $environments_stamp$
    BEGIN
        NEW.inserted := current_timestamp;
        RETURN NEW;
    END;
$environments_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER  environments_stamp BEFORE INSERT ON secret_vault.environments
    FOR EACH ROW EXECUTE PROCEDURE secret_vault.environments_stamp();



CREATE OR REPLACE FUNCTION secret_vault.x_reference_stamp() RETURNS trigger AS $x_reference_stamp$
    BEGIN
        NEW.inserted := current_timestamp;
        RETURN NEW;
    END;
$x_reference_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER  x_reference_stamp BEFORE INSERT ON secret_vault.x_reference
    FOR EACH ROW EXECUTE PROCEDURE secret_vault.x_reference_stamp();



CREATE OR REPLACE FUNCTION secret_vault.tags_stamp() RETURNS trigger AS $tags_stamp$
    BEGIN
        NEW.inserted := current_timestamp;
        RETURN NEW;
    END;
$tags_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER  tags_stamp BEFORE INSERT ON secret_vault.tags
    FOR EACH ROW EXECUTE PROCEDURE secret_vault.tags_stamp();



CREATE OR REPLACE FUNCTION secret_vault.secrets_stamp() RETURNS trigger AS $secrets_stamp$
    BEGIN
        NEW.inserted := current_timestamp;
        RETURN NEW;
    END;
$secrets_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER  secrets_stamp BEFORE INSERT ON secret_vault.secrets
    FOR EACH ROW EXECUTE PROCEDURE secret_vault.secrets_stamp();