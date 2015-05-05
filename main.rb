require 'sinatra'
require 'sinatra/reloader'

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


