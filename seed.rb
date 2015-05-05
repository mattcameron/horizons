require_relative 'db_config'
require_relative 'checkpoint'

Checkpoint.delete_all # everytime I run seed delete all records

Checkpoint.create name: "Queen St/Flinders Lane", 
	description: "On the corner of Queen Street and Flinders Lane", 
	latitude: -37.817896, 
	longitude: 144.962034 

Checkpoint.create name: "Elizabeth St/Flinders Lane", 
	description: "On the corner of Elizabeth Street and Flinders Lane", 
	latitude: -37.817231, 
	longitude: 144.964400 

Checkpoint.create name: "Elizabeth St/Flinders Street", 
	description: "On the corner of Elizabeth Street and Flinders Street", 
	latitude: -37.818125, 
	longitude: 144.964829 

Checkpoint.create name: "Queen St/Flinders Street", 
	description: "On the corner of Queen Street and Flinders Street", 
	latitude: -37.818805, 
	longitude: 144.962464 