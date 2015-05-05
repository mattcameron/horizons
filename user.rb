class User < ActiveRecord::Base
	has_secure_password
	has_many :checkpoint_race_users
	has_many :races, :through => :checkpoint_race_users
	has_many :checkpoints, :through => :checkpoint_race_users
end