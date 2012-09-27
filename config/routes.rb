IOSLocalizationService::Application.routes.draw do
  root :to => 'localization#index'
  match 'login' => 'login#index'
  match 'doLogin' => 'login#login'
  match 'doLogout' => 'login#logout'
  match 'createuser' => 'login#createuser'
  
end
