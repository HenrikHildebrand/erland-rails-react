class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :answers
  has_many :events, class_name: 'Event', foreign_key: 'admin_id'
  has_and_belongs_to_many :events_as_participant, join_table: :events_participants, class_name: 'Event'
  has_and_belongs_to_many :events_as_collaborator, join_table: :events_collaborators, class_name: 'Event'


  def display_name
    email
  end
end
