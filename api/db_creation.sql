CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bike_routes;

CREATE TABLE users (
    id bigint GENERATED ALWAYS AS IDENTITY,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL UNIQUE,
    phone character varying UNIQUE,
    photo text,
    
	PRIMARY KEY(id)
);

CREATE TABLE bike_routes (
    id bigint GENERATED ALWAYS AS IDENTITY,
    users_id bigint NOT NULL,
    data_routes_id bigint NOT NULL,
    title character varying NOT NULL,
    photo text,
    description text NOT NULL,
    duration double precision NOT NULL,
    distance double precision NOT NULL,
    rating double precision NOT NULL,
    average_speed double precision,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    
    -- geographic data
    start_path geography(Point,4326) NOT NULL,
    end_path geography(Point,4326) NOT NULL,
    path_routes geography(LineString,4326),
    
	PRIMARY KEY(id),
	FOREIGN KEY (users_id) REFERENCES users(id)
);
