class CommentsController < ApplicationController
  def new
  end

  def create
    @comment = Comment.new(body: params[:comment][:body], user_id: session[:user_id], channel_id: params[:id])
	  if @comment.valid?
	    @comment.save
	  end
	  redirect_to :back
    end
end
