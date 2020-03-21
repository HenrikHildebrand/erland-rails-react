class Question < ApplicationRecord
  belongs_to :event

  def display_name
    title
  end
end
