class Checkpoint_Race_User < ActiveRecord::Base
	belongs_to :checkpoint
	belongs_to :race
	belongs_to :user
end