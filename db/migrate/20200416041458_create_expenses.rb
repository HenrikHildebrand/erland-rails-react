class CreateExpenses < ActiveRecord::Migration[6.0]
  def change
    create_table :expenses do |t|
      t.references :event
      t.references :creator
      t.float :grand_total
      t.float :percentage

      t.timestamps
    end
  end
end
