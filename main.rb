require 'sinatra'
require 'sinatra/reloader'
require 'pg'
require_relative 'db_config'
require_relative 'checkpoint_race_user'
require_relative 'race'
require_relative 'user'
require_relative 'checkpoint'
# require 'pry'

enable :sessions

before do
	@user = current_user
	@users = User.all
end

after do
	ActiveRecord::Base.connection.close
end

get '/' do
	@race = Race.last
	@users = @race.users.distinct
	@five_users = @race.users.order(id: :asc).limit(6).uniq
  erb :index
end

get '/register' do
	erb :register
end

get '/login' do
	erb :login
end

get '/race' do

	erb :race
end

post '/race/new' do
	redirect to '/' if !logged_in?
	# create new race
	race = Race.create(name: "New Race", created_at: Time.now, ended: false)

	# add the 4 default checkpoints to this race
	CheckpointRaceUser.create(checkpoint_id: 1, race_id: race.id)
	CheckpointRaceUser.create(checkpoint_id: 2, race_id: race.id)
	CheckpointRaceUser.create(checkpoint_id: 3, race_id: race.id)
	CheckpointRaceUser.create(checkpoint_id: 4, race_id: race.id)

	# add the current user to this race
	CheckpointRaceUser.create(race_id: race.id, user_id: current_user.id)

	redirect to '/race'
end


post '/race/join' do
	# make sure they are logged in
	redirect to '/' if !logged_in?

	# Add current user to the current race
	CheckpointRaceUser.create(
		user_id: current_user.id,
		race_id: current_race.id)

	# Redirect to /race
	redirect to '/race'

end

get '/status' do
	erb :status
end

get '/checkpoints' do
	@checkpoints = Checkpoint.all
	erb :checkpoints
end

get '/checkpoints/new' do
	erb :new_checkpoint
end

post '/checkpoints/new' do
	Checkpoint.create( name: params[:name], description: params[:description], latitude: params[:latitude], longitude: params[:longitude])
		redirect to '/checkpoints'
end

# Current race checkpoints
get '/api/checkpoints' do
	content_type :json
	checkpoints = current_race.checkpoints.distinct
	checkpoints.to_json
end

# Current user checkpoints left to hit
get '/api/checkpoints/left' do
	content_type :json
	current_user_checkpoints_left.to_json
end

# Current user completed checkpoints
get '/api/checkpoints/completed' do
	content_type :json
	current_user_checkpoints_hit.to_json
end

post '/api/checkpoints/:id/new' do
	newCP = CheckpointRaceUser.create(
		user_id: current_user.id,
		checkpoint_id: params[:id],
		race_id: current_race.id)
end


# Current race
get '/api/race' do
	content_type :json
	# created_at = current_race.created_at
	# ms_from_epoch = (created_at.to_i * 1000)
	# ms_from_epoch.to_json
	current_race.to_json
end

post '/api/gameover' do
	current_race.update( ended: true )
end

# LOGIN
post '/signup' do
	@user = User.create( user_name: params[:username], email: params[:email], password: params[:password])
		session[:user_id] = @user.id
	redirect to '/'
end

# SESSION STUFF
post '/session' do
	@user = User.where(email: params[:email]).first
	if @user && @user.authenticate(params[:password])
		session[:user_id] = @user.id
		redirect to '/'
	else
		erb :login
	end
end

delete '/session' do
	session[:user_id] = nil
	redirect to '/'
end


# HELPERS

helpers do
	def logged_in?
		!!current_user
	end

	def current_user
			User.find_by(id: session[:user_id])
	end

	def current_race
		# return the last race, even if there is not one running
			current_race = Race.last
	end

	def current_race_checkpoints
		current_race.checkpoints.uniq
	end

	def race_running?
		if current_race.ended == true
			return false
		else
			return true
		end
	end

	def current_user_checkpoints_hit
		data = current_user.checkpoint_race_users.where("race_id = #{current_race.id} and checkpoint_id IS NOT NULL").uniq
		checkpoints = data.map { |row|
			Checkpoint.find(row[:checkpoint_id])
		}
	end

	def current_user_checkpoints_left
		current_race_checkpoints.select do |checkpoint|
			!current_user_checkpoints_hit.include? checkpoint
		end
	end

	def race_time
		created_at = current_race.created_at
		race_time = Time.now.utc - created_at
		Time.at(race_time).strftime("%H:%M:%S")
	end

end

