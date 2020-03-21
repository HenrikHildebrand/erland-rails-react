class Question < ApplicationRecord
  belongs_to :event
  has_many :alternatives
  has_many :answers, through: :alternatives


  accepts_nested_attributes_for :alternatives, allow_destroy: true

  def display_name
    title
  end
end
