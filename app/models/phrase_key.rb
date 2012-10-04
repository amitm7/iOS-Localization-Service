class PhraseKey < ActiveRecord::Base
  attr_accessible :maxLength, :name
  has_many :phrases, :dependent => :delete_all
  belongs_to :screenshot, :dependent => :delete
end
