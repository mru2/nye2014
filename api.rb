require 'sinatra'
require 'json'
require 'redis'

class Api < Sinatra::Base

  REDIS = Redis.new
  TRACKS_KEY = 'tracks'

  get '/vote' do

    track_id = params[:track_id]

    puts "Voting for track : #{track_id}"

    REDIS.zincrby TRACKS_KEY, 1, track_id
  end


  get '/top' do
    content_type :json

    (REDIS.zrevrangebyscore TRACKS_KEY, '+inf', '-inf', :with_scores => true).to_json
  end


  get '/pop' do

    content_type :json

    top = (REDIS.zrevrangebyscore TRACKS_KEY, '+inf', '-inf', :limit => [0, 1]).first

    REDIS.zrem TRACKS_KEY, top

    # TODO : remove from the playlist the former tracks

    top
  end


  get '/clear' do

    REDIS.del TRACKS_KEY

  end

end