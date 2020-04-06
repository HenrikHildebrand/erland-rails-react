class BeerPackage < ApplicationRecord
  before_update :set_accepted_at, :if => :accepted_changed?

  belongs_to :event
  belongs_to :sender, :class_name => 'User'
  belongs_to :receiver, :class_name => 'User'

  validates_presence_of :event_id, :sender_id, :receiver_id

  scope :sent_beers, -> (user_id) { where(sender_id: user_id) }
  scope :received_beers, -> (user_id) { where(receiver_id: user_id) }
  scope :all_beers, -> (user_id) { sent_beers(user_id).or(received_beers(user_id)) }

  def set_accepted_at
    self.accepted_at = Time.now
  end
end
