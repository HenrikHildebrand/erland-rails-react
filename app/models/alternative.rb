class Alternative < ApplicationRecord
  belongs_to :question

  def display_name
    title
  end
end
