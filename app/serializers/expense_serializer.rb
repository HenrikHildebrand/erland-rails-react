class ExpenseSerializer < ApplicationSerializer
  attributes :id, :creator_id, :grand_total, :event_id, :is_creator
  has_many :debtors

  def is_creator
    object.creator == current_user
  end

  def debtors
    object.debtors.collect do |d|
      {
        id: d.id,
        name: d.name,
        email: d.email
      }
    end
  end
end
