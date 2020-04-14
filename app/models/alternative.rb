class Alternative < ApplicationRecord
  belongs_to :question
  has_many :answers, dependent: :destroy

  validates_uniqueness_of :correct, conditions: -> { where(correct: true) }, scope: :question_id
  validates_presence_of :title, :question_id
  validates :correct, inclusion: { in: [true, false] }

def display_name
    title
  end
end
