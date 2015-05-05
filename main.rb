require 'sinatra'
require 'sinatra/reloader'
require 'active_record'
require_relative 'main'
require_relative 'race'
require_relative 'user'
require_relative 'checkpoint'


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


