class Alternative < ApplicationRecord
  belongs_to :question
  has_many :answers

  def display_name
    title
  end
end
