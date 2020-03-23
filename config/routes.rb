Rails.application.routes.draw do
    devise_for :users, controllers: {
        sessions: 'users/sessions',
        omniauth_callbacks: 'users/omniauth_callbacks'
    }
    devise_for :admin_users, ActiveAdmin::Devise.config
    ActiveAdmin.routes(self)

    namespace :v1 do
        resources :events
        resources :beer_packages
    end

    get '/signed_out' => 'home#signed_out'
    root 'home#index'
end
