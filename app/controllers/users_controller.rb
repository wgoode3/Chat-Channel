class UsersController < ApplicationController

  def show
  	@user = User.find(params[:id])
  	@channel = Channel.where(user_id: params[:id])
  end

  def create
  	@user = User.new(user_params)
  	if @user.save
  	  session[:user_id] = @user.id
      redirect_to '/channels/main'
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :back
    end
  end

  def edit
    @channel = Channel.where(user_id: params[:id])
  	if session[:user_id] == params[:id].to_i
  		@user = User.find(params[:id])
  	else
  		redirect_to '/channels/main'
  	end
  end

  def update
  	@user = User.find(params[:id])
  	if user_params[:avatar] == nil
  		User.update(params[:id], user_params)
  	else
  		User.update(params[:id], user_params)
  	end
  	redirect_to :back
  end

  def delete
  	if session[:user_id] == params[:id].to_i
  		User.find(params[:id]).destroy
  		reset_session
  		redirect_to "/sessions/new"
  	else
  		redirect_to '/channels/main'
  	end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar)
  end
end
