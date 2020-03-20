class Event < ApplicationRecord
  belongs_to :admin, class_name: 'User'
  has_and_belongs_to_many :participants, join_table: :events_participants, class_name: 'User'

end
