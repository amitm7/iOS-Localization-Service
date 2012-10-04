class Phrase < ActiveRecord::Base
  attr_accessible :content, :language
  belongs_to :phraseKey, :dependent => :delete
  belongs_to :language, :dependent => :delete
end
