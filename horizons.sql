CREATE DATABASE horizons;

CREATE TABLE locations (
	id SERIAL4 PRIMARY KEY,
	latitude VARCHAR(500) NOT NULL,
	longitude VARCHAR(500) NOT NULL,
);


CREATE TABLE users (
	id SERIAL4 PRIMARY KEY,
	user_name VARCHAR(30) NOT NULL,
	email VARCHAR(200) NOT NULL,
	password_digest VARCHAR(300) NOT NULL,
);

CREATE TABLE checkpoint_users (
	user_id INTEGER
	location_id INTEGER
);
