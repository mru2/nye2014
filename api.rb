require 'sinatra'
require 'json'
require 'redis'

class Api < Sinatra::Base

  redis_uri = URI.parse(ENV["REDISTOGO_URL"] || "http://127.0.0.1:6379")
  REDIS = Redis.new(:host => redis_uri.host, :port => redis_uri.port, :password => redis_uri.password)

  TRACKS_KEY = 'tracks'
  DETAILS_KEY = 'track_info'

  get '/vote' do

    track_id = params[:track_id]
    artist = params[:artist]
    title = params[:title]
    score = params[:score].to_i

    puts "Voting for track : #{params.inspect}"


    # Increment the score
    REDIS.zincrby TRACKS_KEY, score, track_id

    # Store the track details
    REDIS.hset "DETAILS_KEY:#{track_id}", "artist", artist
    REDIS.hset "DETAILS_KEY:#{track_id}", "title", title
  end


  get '/top' do
    content_type :json

    top_tracks = REDIS.zrevrangebyscore TRACKS_KEY, '+inf', '1', :with_scores => true

    top_tracks.map{|track_id, track_score| REDIS.hgetall("DETAILS_KEY:#{track_id}").merge(:score => track_score, :id => track_id) }.to_json
  end


  get '/pop' do

    content_type :json

    top = (REDIS.zrevrangebyscore TRACKS_KEY, '+inf', '-inf', :limit => [0, 1]).first

    REDIS.zrem TRACKS_KEY, top
    REDIS.del "DETAILS_KEY:#{top}"

    # TODO : remove from the playlist the former tracks

    top
  end


  get '/clear' do

    REDIS.del TRACKS_KEY

  end

end