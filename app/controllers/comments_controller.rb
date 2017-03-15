class CommentsController < ApplicationController
  def create
    @comment = Comment.new(body: params[:body], user_id: session[:user_id], channel_id: params[:id])
    @channel = Channel.find(params[:id])
	  if @comment.valid?
	    @comment.save
	  end
	  render :template => 'comments/_comment', :layout => false
  end

  def get
    # changed to render one comment instead of 50...
    @comment = Comment.where(channel_id: params[:id]).last
    @channel = Channel.find(params[:id])
	  render :template => 'comments/_comment', :layout => false
  end

  def delete
    # make it harder to hack the delete comment button
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
end
