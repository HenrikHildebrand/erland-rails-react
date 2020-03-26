class Event < ApplicationRecord
  belongs_to :admin, class_name: 'User'
  has_and_belongs_to_many :participants, join_table: :events_participants, class_name: 'User'
  has_and_belongs_to_many :collaborators, join_table: :events_collaborators, class_name: 'User'
  has_and_belongs_to_many :songs, {class_name: 'Song'}
  has_many :facts, dependent: :destroy
  has_many :questions, dependent: :destroy
  has_many :answers, through: :questions
  has_many :beer_packages, dependent: :destroy
  has_many :wallets, dependent: :destroy
end
