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

  validates_presence_of :title, :admin_id, :date, :public, :invite_only
  validates :title, length: { minimum: 3, maximum: 100 }
  validates :initial_credits, numericality: true
  # validates_numericality_of :initial_credits, greater_than_or_equal_to: 0
  validates_numericality_of :initial_credits, :if => Proc.new{|f| f.display_name.blank? }

  def event_date_larger_than_or_equal_to_today
    if date >= Date.today
      errors.add(:date, "You cannot enter a date in the past.")
    end
  end

  # TODO
    # implement that event can only have unique one user_id
end
