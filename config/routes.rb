Rails.application.routes.draw do

  # session routes
  get 'sessions/new' => 'sessions#new'
  get 'logout' => 'sessions#logout'
  post 'login' => 'sessions#login'

  # user routes
  get 'users/:id' => 'users#show'
  get 'users/:id/edit' => 'users#edit'
  post 'create' => 'users#create' 
  post 'users/:id/patch' => 'users#update'
  post 'users/:id/delete' => 'users#delete'

  # channel routes
  get 'channels/main'
  get 'channels/new'
  get 'channels/:id' => 'channels#show'
  get 'channels/:id/edit' => 'channels#edit'
  root 'channels#main'
  post 'channels/create' => 'channels#create'
  post 'channels/:id/patch' => 'channels#update'
  post 'channels/:id/delete' => 'channels#delete'
  post 'channels/:id/secret' => 'channels#secret'
  post 'stream/:id' => 'channels#stream'
  post 'unstream/:id' => 'channels#unstream'
  post 'follow/:id' => 'channels#follow'
  post 'unfollow/:id' => 'channels#unfollow'

  # comment routes
  get 'channels/:id/comment' => 'comments#get'
  post 'channels/:id/comment' => 'comments#create'
  post 'comments/:id/delete' => 'comments#delete'
  post 'mod/:id' => 'comments#mod'
  post 'unmod/:id' => 'comments#unmod'
  post 'ban/:id' => 'comments#ban'
  post 'unban/:id' => 'comments#unban'

  # extra routes
  get 'blog' => 'extras#blog'
  get 'faq'  => 'extras#faq'
  get 'admin' => 'extras#admin'

end