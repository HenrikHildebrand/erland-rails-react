class Wallet < ApplicationRecord
  belongs_to :event
  belongs_to :user
  validates_presence_of :user, :event, :credits
  validates_uniqueness_of :user, scope: :event
  validates_numericality_of :credits, greater_than_or_equal_to: 0
end
