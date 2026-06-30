require 'webrick'
port = (ENV['PORT'] || 3939).to_i
server = WEBrick::HTTPServer.new(Port: port, DocumentRoot: File.dirname(__FILE__), AccessLog: [])
trap('INT') { server.stop }
trap('TERM') { server.stop }
server.start
