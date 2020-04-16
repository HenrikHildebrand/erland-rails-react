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
  has_many :invites, dependent: :destroy
  has_one :expense

  validates_presence_of :title, :admin_id
  validates :invite_only, :is_public, inclusion: { in: [true, false] }
  validates :title, length: { minimum: 3, maximum: 100 }
  validates :initial_credits, numericality: true
  validate :is_valid_date

  private
  def is_valid_date
    if not date.present?
      errors.add(:date, "Date must exist.")
    elsif date < Date.today
      errors.add(:date, "You cannot enter a date in the past.")
    end
  end

  # TODO
    # implement that event can only have unique one user_id
end
