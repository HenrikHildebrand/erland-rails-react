Rails.application.routes.draw do
    devise_for :users, controllers: {
        sessions: 'users/sessions',
    }
    devise_for :admin_users, ActiveAdmin::Devise.config
    ActiveAdmin.routes(self)

    namespace :v1 do
        resources :events
    end

    get '/signed_out' => 'home#signed_out'
    root 'home#index'
end
