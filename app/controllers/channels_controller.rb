require 'securerandom'

class ChannelsController < ApplicationController
  def main
  	@channels = Channel.all
  	if session[:user_id]
  		@user = User.find(session[:user_id])
  	end
  end

  def new
  	@user = User.find(session[:user_id])
  end

  def show
  	@channel = Channel.find(params[:id])
    @comments = Comment.where(channel_id: params[:id]).last(50)
  end

  def create
  	secret = SecureRandom.hex(6)
  	@channel = Channel.new(name: params[:channel][:name], description: params[:channel][:description], logo: params[:channel][:logo], user_id: session[:user_id], secret: secret)
  	if @channel.save
      redirect_to "/users/#{session[:user_id]}"
    else
      flash[:errors] = @channel.errors.full_messages
      redirect_to :back
    end
  end 

  def edit
  	@channel = Channel.where(user_id: session[:user_id])[0]
  end

  def secret
  	secret = SecureRandom.hex(6)
  	Channel.update(params[:id], secret: secret)
  	redirect_to :back
  end

  def update
  	if params[:channel][:logo] == nil
  		Channel.update(params[:id], name: params[:channel][:name], description: params[:channel][:description])
  	else
  		Channel.update(params[:id], name: params[:channel][:name], description: params[:channel][:description], logo: params[:channel][:logo])
  	end
  	redirect_to :back
  end

  def delete
  	@channel = Channel.find(params[:id])
  	if session[:user_id] == @channel.user_id
  		Channel.find(params[:id]).destroy
  		redirect_to "/users/#{session[:user_id]}"
  	else
  		redirect_to '/channels/main'
  	end
  end

  private
  def channel_params
  end

end
