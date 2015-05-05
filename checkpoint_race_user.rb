class CheckpointRaceUser < ActiveRecord::Base
	belongs_to :checkpoint
	belongs_to :race
	belongs_to :user
end