class SessionsController < ApplicationController
  
  # renders the login and registration forms
  def new
  end
  
  # allows a user to login
  def login
    user = User.find_by_email(params[:user][:email])
    if user == nil
      flash[:errors] = ["Email not found!"]
      redirect_to :back
    else
      if user.authenticate(params[:user][:password])
        session[:user_id] = user.id
        redirect_to '/channels/main'
      else
        flash[:errors] = ["Password does not match!"]
        redirect_to :back
      end
    end
  end
  
  # allows a user to logout
  def logout
    reset_session
    redirect_to '/sessions/new'
  end
  
end