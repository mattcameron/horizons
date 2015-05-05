require 'active_record'

local_db = {
	:adapter => 'postgresql',
	:database => 'horizons'
}

 # TO CONNECT TO DATABASE ON HEROKU
ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'] || local_db)