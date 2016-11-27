Rails.application.routes.draw do
  
  get 'sessions/new' => 'sessions#new'

  post 'login' => 'sessions#login'

  get 'logout' => 'sessions#logout'

  post 'create' => 'users#create' 

  get 'users/:id' => 'users#show'

  get 'users/:id/edit' => 'users#edit'

  post 'users/:id/patch' => 'users#update'

  post 'users/:id/delete' => 'users#delete'

  get 'channels/main'

  root 'channels#main'

  get 'channels/new'

  post 'channels/create' => 'channels#create'

  get 'channels/:id' => 'channels#show'

  get 'channels/:id/edit' => 'channels#edit'

  post 'channels/:id/patch' => 'channels#update'

  post 'channels/:id/delete' => 'channels#delete'

  post 'channels/:id/secret' => 'channels#secret'

  get 'comments/new'

  post 'channels/:id/comment' => 'comments#create'

end
