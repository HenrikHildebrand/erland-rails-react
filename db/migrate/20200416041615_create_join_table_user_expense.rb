class CreateJoinTableUserExpense < ActiveRecord::Migration[6.0]
  def change
    create_join_table :users, :expenses do |t|
      # t.index [:user_id, :expense_id]
      # t.index [:expense_id, :user_id]
    end
  end
end