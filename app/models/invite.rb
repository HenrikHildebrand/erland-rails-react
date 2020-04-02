class Invite < ApplicationRecord
  belongs_to :event
  before_create :generate_invite_token

  validates_uniqueness_of :event
  validates_presence_of :limit
  validates_numericality_of :limit, greater_than_or_equal_to: 0

  private
  def generate_invite_token
      self.invite_token = SecureRandom.urlsafe_base64(12)
  end

end
