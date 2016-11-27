class SessionsController < ApplicationController
  
  def new
  end
  
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
  
  def logout
    reset_session
    redirect_to '/sessions/new'
  end
  
end
