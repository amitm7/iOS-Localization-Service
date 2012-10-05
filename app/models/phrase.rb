class Phrase < ActiveRecord::Base
  attr_accessible :content, :language
  belongs_to :phrase_key, :dependent => :delete
  belongs_to :language, :dependent => :delete
end
