class AddCustomDebtToExpense < ActiveRecord::Migration[6.0]
  def change
    add_column :expenses, :custom_debt, :json
  end
end
