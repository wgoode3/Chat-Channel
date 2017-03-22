class ExtrasController < ApplicationController
  
  # renders some sort of blog page
  def blog
  	@user = User.find(1)
    if session[:user_id]
      @check = Channel.where(user: session[:user_id])
    end
  end

  # render a page with answers to common questions like "how do I stream?"
  def faq
    if session[:user_id]
      @check = Channel.where(user: session[:user_id])
    end
  end

  # render a page for site administrators
  def admin
    if session[:user_id]
      @check = Channel.where(user: session[:user_id])
    end
  end

end
