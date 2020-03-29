class Invite < ApplicationRecord
  belongs_to :event
  before_create :generate_invite_token

  validates_uniqueness_of :event

  private
  def generate_invite_token
      self.invite_token = SecureRandom.urlsafe_base64(12)
  end
end
