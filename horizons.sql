CREATE DATABASE horizons;

CREATE TABLE checkpoints (
	id SERIAL4 PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(500),
	latitude INTEGER NOT NULL,
	longitude INTEGER NOT NULL,
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
