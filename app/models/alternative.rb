class Alternative < ApplicationRecord
  belongs_to :question
  has_many :answers, dependent: :destroy

  def display_name
    title
  end
end
