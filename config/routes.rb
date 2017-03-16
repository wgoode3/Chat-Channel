Rails.application.routes.draw do
  
  # session routes
  get 'sessions/new' => 'sessions#new'
  post 'login' => 'sessions#login'
  get 'logout' => 'sessions#logout'

  # user routes
  post 'create' => 'users#create' 
  get 'users/:id' => 'users#show'
  get 'users/:id/edit' => 'users#edit'
  post 'users/:id/patch' => 'users#update'
  post 'users/:id/delete' => 'users#delete'

  # channels routes
  get 'channels/main'
  get 'channels/new'
  root 'channels#main'
  post 'channels/create' => 'channels#create'
  get 'channels/:id' => 'channels#show'
  get 'channels/:id/edit' => 'channels#edit'
  post 'channels/:id/patch' => 'channels#update'
  post 'channels/:id/delete' => 'channels#delete'
  post 'channels/:id/secret' => 'channels#secret'

  # comments routes
  post 'channels/:id/comment' => 'comments#create'
  get 'channels/:id/comment' => 'comments#get'
  post 'comments/:id/delete' => 'comments#delete'

  # blog, faq, admin pages
  # get 'blog' => 'extras#blog'
  # get 'faq'  => 'extras#faq'
  # get 'admin' => 'extras#faq'

end