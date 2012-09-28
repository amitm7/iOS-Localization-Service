class Phrase < ActiveRecord::Base
  attr_accessible :content, :language
  belongs_to :phraseKey
  has_one :language
end
