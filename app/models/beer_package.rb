class BeerPackage < ApplicationRecord
  belongs_to :event
  belongs_to :sender, :class_name => 'User'
  belongs_to :receiver, :class_name => 'User'

  scope :sent_beers, -> (user_id) { where(sender_id: user_id) }
  scope :received_beers, -> (user_id) { where(receiver_id: user_id) }
  scope :all_beers, -> (user_id) { sent_beers(user_id).or(received_beers(user_id)) } 
end 
