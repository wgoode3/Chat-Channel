# Chat Channel
A twitch.tv inspired live-streaming platform written in ruby on rails. Currently uses JW Player to turn RTMP streams into video and uses socket.io and node.js for a live chat.

## Ruby Version
* ruby -v 2.2.4p230
* rails -v 4.2.1

## How to get it running
It may be necessary to comment out the following in the gemfile
```ruby
gem 'therubyracer', platform: :ruby
```
After making any edits to the gem file
```
$ bundle install
```
The postgresql database may need to be created
```
$ rake:db create
$ rake:db migrate
```
Run the server with
```
$ rails server -b 0.0.0.0
```

## Getting chat to work
To get live updating chat to work be sure to have node.js installed and run
```
$ npm install
```
You will need to edit ```/app/assets/javascripts/channel_ajax.js```
```javascript
var socket = io.connect('http://192.168.1.250:3001');
```
to reflect the right IP for for your node server.

## To get video streaming to work
Set up the an NGINX server for RTMP streams. I followed [this guide](https://obsproject.com/forum/resources/how-to-set-up-your-own-private-rtmp-server-using-nginx.50/).
You will need to edit ```/app/assets/javascripts/video_player.js```
```javascript
file: `rtmp://192.168.1.28:1935/live/flv:${secret}`,
```
to reflect the right IP of your NGINX server.

Instructions on how to use Open Broadcaster Software should be in the faq section of the site... if I remember to make such instructions.

This was a fun project. Have fun streaming.
