class PhraseKey < ActiveRecord::Base
  attr_accessible :maxLength, :name, :screenshot
  has_many :phrases
end
