class User < ActiveRecord::Base
  attr_accessible :email
  attr_accessible :password
  attr_accessible :isDeveloper
end
