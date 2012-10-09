require 'digest/md5'

class LoginController < ApplicationController
  def index
    render "login"
  end

  def login
    password = Digest::MD5.hexdigest(params[:password])
    user = User.where(:email => params[:email], :password => password).first;
    if user.nil?
      render :text => "fail"
    else
      session[:user] = user
      render :text => "success"
    end
  end

  def logout
    reset_session
    redirect_to :controller=>'login', :action=> 'index'
  end

  def createuser
    if isDeveloper == false
      return
    end
    if params[:email].nil? or params[:password].nil?
      return
    end

    password = Digest::MD5.hexdigest(params[:password])
    User.create(:email => params[:email], :password => password)
  end
end
