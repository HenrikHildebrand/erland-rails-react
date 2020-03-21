class Answer < ApplicationRecord
  belongs_to :user
  belongs_to :alternative


  def event
    alternative.question.event
  end
end
