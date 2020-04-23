class Expense < ApplicationRecord
  belongs_to :event
  belongs_to :creator, class_name: 'User'
  has_and_belongs_to_many :debtors, join_table: :expenses_users, class_name: 'User'

  validates_presence_of :creator, :event
  validates :grand_total, presence: true,
            numericality: { greater_than_or_equal_to: 0 }

end