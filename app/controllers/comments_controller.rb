class CommentsController < ApplicationController
  
  # creates a new comment for a given chat, sends an html response
  def create
    @comment = Comment.new(body: params[:body], user_id: session[:user_id], channel_id: params[:id])
    @channel = Channel.find(params[:id])
	  if @comment.valid?
	    @comment.save
	  end
	  render :template => 'comments/_comment', :layout => false
  end

  # gets one comment, renders it, and sends an html response
  def get
    @comment = Comment.where(channel_id: params[:id]).last
    @channel = Channel.find(params[:id])
	  render :template => 'comments/_comment', :layout => false
  end

  # delete a comment with some safeguards to reduce hacking
  def delete
    if session[:user_id].to_s == params[:user]
      if params[:id] == params[:comment]
        Comment.find(params[:id]).destroy
        data = {:response => "deleted"}
      else
        data = {:response => "not delete"}
      end
    else
      data = {:response => "not delete"}
    end
    render json: data
  end

  # allows a channel owner to grant mod privileges to a user
  def mod
    # check if there is already a user channel relationship
    @mod = ChannelUser.where(user: session[:user_id]).where(channel: params[:id])
    if @mod.exists?
      @mod[0].mod = true
    else
      @mod = ChannelUser.new(user: session[:user_id], channel: params[:id], mod: true)
    end
    @mod.save
    render json: {message: 'mod'}
  end

  # allows a channel owner to remove mod privileges from a user
  def unmod
    # retrieve the user channel relationship
    @notmod = ChannelUser.where(user: session[:user_id]).where(channel: params[:id])
    if @notmod.exists?
      @notmod[0].mod = false
    end
    @notmod.save
    render json: {message: 'unmod'}
  end

  # allows a channel owner or mod to ban a user for a specified time
  def ban
    # check if there is already a user channel relationship
    @ban = ChannelUser.where(user: session[:user_id]).where(channel: params[:id])
    if @ban.exists?
      # eventually we'll allow variable length bans
      # or possibly bans could escalate to a permanent ban?
      @ban[0].ban = true
      @ban[0].ends = Time.now + 1.days
    else
      end_date = Time.now + 1.days
      @ban = ChannelUser.new(user: session[:user_id], channel: params[:id], ban: true, ends: end_date)
    end
    @ban.save
    render json: {message: 'ban'}
  end

  # on reflection it would be better to have a standalone ban table
  # that way I could keep track of a complete ban history

  # allows a channel owner or mod to unban a user
  def unban
    @ban = ChannelUser.where(user: session[:user_id]).where(channel: params[:id])
    if @ban.exists?
      @ban[0].ban = false
    end
    @ban.save
    render json: {message: 'unban'}
  end

end