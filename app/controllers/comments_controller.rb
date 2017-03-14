class CommentsController < ApplicationController
  def create
    @comment = Comment.new(body: params[:body], user_id: session[:user_id], channel_id: params[:id])
	  if @comment.valid?
	    @comment.save
	  end
	  render :template => 'comments/_comment', :layout => false
  end

  def get
    @comments = Comment.where(channel_id: params[:id])
	  render :template => 'comments/_comments', :layout => false
  end
end
