require 'rack'
require 'rack/contrib/try_static'
require 'rack/contrib/not_found'

require './api.rb'

root_directory = ::File.expand_path('..',  __FILE__)

map "/api" do
  run Api
end


map "/" do  

  use Rack::TryStatic,
    :root => ::File.join(root_directory, '.'),
    :urls => %w(/),
    :try  => ['.html', 'index.html', '/index.html']

end

run Rack::NotFound.new(::File.join(root_directory, '404.html'))