class UsersController < ApplicationController

  # renders a page to show a specific user and their channel if they have one
  def show
  	@user = User.find(params[:id])
  	@channel = Channel.where(user_id: params[:id])
  end

  # allows a user to create an account
  def create
  	@user = User.new(user_params)
    # need to initialize a user with is_admin set to false
    @user.is_admin = false
  	if @user.save
  	  session[:user_id] = @user.id
      redirect_to '/channels/main'
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :back
    end
  end

  # renders an edit user page
  def edit
    @channel = Channel.where(user_id: params[:id])
  	if session[:user_id] == params[:id].to_i
  		@user = User.find(params[:id])
  	else
  		redirect_to '/channels/main'
  	end
  end

  # updates a user
  def update
  	@user = User.find(params[:id])
  	if user_params[:avatar] == nil
  		User.update(params[:id], user_params)
  	else
  		User.update(params[:id], user_params)
  	end
  	redirect_to :back
  end

  # deletes a user
  def delete
  	if session[:user_id] == params[:id].to_i
  		User.find(params[:id]).destroy
  		reset_session
  		redirect_to "/sessions/new"
  	else
  		redirect_to '/channels/main'
  	end
  end

  # private method for creating, updating a user
  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar)
  end

end