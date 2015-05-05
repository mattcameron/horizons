require 'sinatra'
require 'sinatra/reloader'
require 'active_record'
require_relative 'main'
require_relative 'race'
require_relative 'user'
require_relative 'checkpoint'

enable :sessions

before do
		@user = current_user
end

after do
	ActiveRecord::Base.connection.close
end

  get '/' do
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

  get '/status' do
  	erb :status
  end

  get '/api/checkpoints' do
  	content_type :json
  	checkpoints = Checkpoint.all
  	checkpoints.to_json
  end

  post '/session' do
		@user = User.where(email: params[:email]).first
		if @user && @user.authenticate(params[:password])
			session[:user_id] = @user.id
			redirect to '/'
		else
			erb :login
		end
	end

	post '/signup' do
	@user = User.create( username: params[:username], email: params[:email], password: params[:password])
		session[:user_id] = @user.id
	redirect to ('/')
end


helpers do
	def logged_in?
		!!current_user
	end

	def current_user
			User.find_by(id: session[:user_id])
	end
end

