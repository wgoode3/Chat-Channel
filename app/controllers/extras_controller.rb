class ExtrasController < ApplicationController
  
  # renders some sort of blog page
  def blog
  	@user = User.find(1)
  end

  # render a page with answers to common questions like "how do I stream?"
  def faq
  end

  # render a page for site administrators
  def admin
  end

end
