class Race < ActiveRecord::Base
	has_many :checkpoint_race_users
	has_many :users, :through => :checkpoint_race_users
	has_many :checkpoints, :through => :checkpoint_race_users
end