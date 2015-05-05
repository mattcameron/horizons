class Checkpoint < ActiveRecord::Base
	has_many :checkpoint_race_users
	has_many :users, :through => :checkpoint_race_users
	has_many :races, :through => :checkpoint_race_users
end