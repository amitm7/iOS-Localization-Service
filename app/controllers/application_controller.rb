class ApplicationController < ActionController::Base
  def isDeveloper
    if isUser == true
      if session[:user].isDeveloper == true
        return true
      end
      render :nothing => true
    end

    return false
  end

  def isUser
    if session[:user].nil?
      render :nothing => true
      return false
    end
    return true
  end
end
