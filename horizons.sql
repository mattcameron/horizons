CREATE DATABASE horizons;

CREATE TABLE checkpoints (
  id SERIAL4 PRIMARY KEY,
	name VARCHAR(50),
	description VARCHAR(500),
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  image_url VARCHAR(500)
);

CREATE TABLE users (
  id SERIAL4 PRIMARY KEY,
  user_name VARCHAR(30) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password_digest VARCHAR(300) NOT NULL
);

CREATE TABLE races (
  id SERIAL4 PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE checkpoints_races_users (
  user_id INTEGER,
  checkpoint_id INTEGER,
  race_id INTEGER
);
