require 'active_record'
require 'pry'


#show sql in the terminal
ActiveRecord::Base.logger = Logger.new(STDERR)

require_relative 'db_config'
require_relative 'race'
require_relative 'user'
require_relative 'checkpoint'

binding.pry