require_relative 'db_config'
require_relative 'checkpoint'
require_relative 'user'
require_relative 'race'
require_relative 'checkpoint_race_user'

Checkpoint.delete_all # everytime I run seed delete all records

Checkpoint.create id: 1,
	name: "Queen St/Flinders Lane",
	description: "On the corner of Queen Street and Flinders Lane",
	latitude: -37.817896,
	longitude: 144.962034

Checkpoint.create id: 2,
	name: "Elizabeth St/Flinders Lane",
	description: "On the corner of Elizabeth Street and Flinders Lane",
	latitude: -37.817231,
	longitude: 144.964400

Checkpoint.create id: 3,
	name: "Elizabeth St/Flinders Street",
	description: "On the corner of Elizabeth Street and Flinders Street",
	latitude: -37.818125,
	longitude: 144.964829

Checkpoint.create id: 4,
	name: "Queen St/Flinders Street",
	description: "On the corner of Queen Street and Flinders Street",
	latitude: -37.818805,
	longitude: 144.962464


User.delete_all

User.create id: 1,
	user_name: "Beta",
	email: "beta@37celcius.com",
	password: "password"

User.create id: 2,
	user_name: "DT",
	email: "dt@ga.com",
	password: "password"

User.create id: 3,
	user_name: "Phil",
	email: "phil@littlepony.com",
	password: "password"

User.create id: 4,
	user_name: "Treva",
	email: "treva@37celcius.com",
	password: "password"

User.create id: 5,
	user_name: "Swanny",
	email: "swanny@ga.com",
	password: "password"

User.create id: 6,
	user_name: "Old Mate",
	email: "oldmate@littlepony.com",
	password: "password"

User.create id: 7,
	user_name: "New Mate",
	email: "newmate@littlepony.com",
	password: "password"

Race.delete_all

Race.create id: 1,
	name: "Melbourne Madness",
	created_at: Time.now,
	ended: false


CheckpointRaceUser.delete_all

CheckpointRaceUser.create id: 1,
	user_id: 1,
	checkpoint_id: 2,
	race_id: 1

CheckpointRaceUser.create id: 2,
	user_id: 1,
	checkpoint_id: 3,
	race_id: 1

CheckpointRaceUser.create id: 3,
	user_id: 2,
	checkpoint_id: 1,
	race_id: 1

CheckpointRaceUser.create id: 4,
	user_id: 2,
	checkpoint_id: 2,
	race_id: 1

CheckpointRaceUser.create id: 5,
	user_id: 3,
	checkpoint_id: 2,
	race_id: 1

CheckpointRaceUser.create id: 6,
	user_id: 4,
	checkpoint_id: 2,
	race_id: 1

CheckpointRaceUser.create id: 7,
	user_id: 5,
	checkpoint_id: 3,
	race_id: 1

CheckpointRaceUser.create id: 8,
	user_id: 5,
	checkpoint_id: 1,
	race_id: 1

CheckpointRaceUser.create id: 9,
	user_id: 6,
	checkpoint_id: 1,
	race_id: 1

CheckpointRaceUser.create id: 10,
	user_id: 7,
	checkpoint_id: 2,
	race_id: 1
