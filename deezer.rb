require 'httparty'

class Deezer

  include HTTParty

  base_uri 'https://api.deezer.com'

  def initialize(u, p)
    @auth = {:username => u, :password => p}
  end

end