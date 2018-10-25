Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :stocks
    end
  end
end
