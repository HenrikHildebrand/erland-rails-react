class AllowInitialCreditToBeNull < ActiveRecord::Migration[6.0]
  def change
    change_column :events, :initial_credits, :integer, :null => true
  end
end
