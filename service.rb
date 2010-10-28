set :public, File.dirname(__FILE__) + '/public'

get('/') do
  redirect '/index.html'
end