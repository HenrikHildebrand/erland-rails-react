Rails.application.routes.draw do
    devise_for :users, controllers: {
        sessions: 'users/sessions',
        omniauth_callbacks: 'users/omniauth_callbacks'
    }
    devise_for :admin_users, ActiveAdmin::Devise.config
    ActiveAdmin.routes(self)

    namespace :v1 do
        resources :users
        resources :events do
            member do
                post 'join' => 'events#join'
                post 'leave' => 'events#leave'
            end
        end
        resources :beer_packages
        resources :wallets
        resources :invites
        resources :questions
        resources :alternatives
        resources :answers
        resources :songs

        get '/events/:id/participants' => 'events#participants', as: :event_participants
        get '/events/:id/questions' => 'events#questions', as: :event_quetions
    end

    get '/signed_out' => 'home#signed_out'
    root 'home#index'
end
