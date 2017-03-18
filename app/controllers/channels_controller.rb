require 'securerandom'

class ChannelsController < ApplicationController
  
  # renders a homepage with a list of popular channels and some mechanism to find other channels
  def main
  	@channels = Channel.all
    if @channels
      # create a list of hashes with the necessary fields that I can use inside my javascript
      @list = []
      @channels.each do |channel|
        object = {"id" => channel.id,
                  "name" => channel.name,
                  "description" => channel.description,
                  "user" => channel.user.username,
                  "logo" => channel.logo.url(:thumb)}
        @list.push(object)
      end
    end
  	if session[:user_id]
  		@user = User.find(session[:user_id])
  	end
  end

  # renders a form for a user to create their own channel
  def new
  	@user = User.find(session[:user_id])
  end

  # renders a page showing a user their channel
  def show
  	@channel = Channel.find(params[:id])
    @comments = Comment.where(channel_id: params[:id]).last(50)
  end

  # allows a user to create their own channel
  def create
  	secret = SecureRandom.hex(6)
  	@channel = Channel.new(name: params[:channel][:name], description: params[:channel][:description], logo: params[:channel][:logo], user_id: session[:user_id], secret: secret)
  	# need to initialize a channel with is_live set to fault
    @channel.is_live = false
    if @channel.save
      redirect_to "/users/#{session[:user_id]}"
    else
      flash[:errors] = @channel.errors.full_messages
      redirect_to :back
    end
  end 

  # renders a form to edit a channel
  def edit
  	@channel = Channel.where(user_id: session[:user_id])[0]
  end

  # updates the channel's secret key used in streaming
  def secret
  	secret = SecureRandom.hex(6)
  	Channel.update(params[:id], secret: secret)
  	redirect_to :back
  end

  # allows a user to change their channel
  def update
  	if params[:channel][:logo] == nil
  		Channel.update(params[:id], name: params[:channel][:name], description: params[:channel][:description])
  	else
  		Channel.update(params[:id], name: params[:channel][:name], description: params[:channel][:description], logo: params[:channel][:logo])
  	end
  	redirect_to :back
  end

  # allows a user to delete their channel
  def delete
  	@channel = Channel.find(params[:id])
  	if session[:user_id] == @channel.user_id
  		Channel.find(params[:id]).destroy
  		redirect_to "/users/#{session[:user_id]}"
  	else
  		redirect_to '/channels/main'
  	end
  end

  # allows a channel to initiate a streaming session
  def stream
    @channel = Channel.find(params[:id])
    if session[:user_id] == @channel.user_id
      @channel.is_live = true
      @channel.save
    end
    redirect_to :back
  end

  # allows a channel to end a streaming session
  def unstream
    @channel = Channel.find(params[:id])
    if session[:user_id] == @channel.user_id
      @channel.is_live = false
      @channel.save
    end
    redirect_to :back
  end

  # allows a user to follow a channel
  def follow
    # need to prevent duplicates...
    @follow = ChannelUser.where(user: session[:user_id]).where(channel: params[:id])
    if @follow.exists?
      @follow[0].follower = true
    else
      @follow = ChannelUser.new(user: session[:user_id], channel: params[:id], follower: true)
    end
    @follow.save
    render json: {message: 'follow'}
  end

  # allows a user to unfollow a channel
  def unfollow
    # retrieve the user channel relationship
    @follow = ChannelUser.where(user: session[:user_id]).where(channel: params[:id])
    if @follow.exists?
      @follow[0].follower = false
      @follow.save
    end
    render json: {message: 'unfollow'}
  end

  # currently unused...
  private
    def channel_params
  end

end
