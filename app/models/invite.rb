class Invite < ApplicationRecord

  belongs_to :event
  has_secure_token :invite_token

  validates_uniqueness_of :event_id
  validates_presence_of :limit
  validates_numericality_of :limit, greater_than_or_equal_to: 0

end
