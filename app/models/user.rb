class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :events, class_name: 'Event'
  has_and_belongs_to_many :events_as_participant, join_table: :events_participants, class_name: 'Event'
  has_and_belongs_to_many :events_as_collaborators, join_table: :events_collaborators, class_name: 'Event'
end
