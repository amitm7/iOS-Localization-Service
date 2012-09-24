class LoginController < ApplicationController
  def index
    #redirect_to(@book)
    render "login"
  end

  def login
    @user = User.where(:email => "loofy2@gmail.com", :password => "password1").first;
    session[:user] = @user

    if @user.nil?
      render :json => "fail"
    else
      render :json => "success"
    end
  end

  def logout
    reset_session
    render :nothing => true
  end
end