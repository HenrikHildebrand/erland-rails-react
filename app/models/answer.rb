class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :alternative

  validates_presence_of :alternative_id, :user_id

  def event
    alternative.question.event
  end
end