class CreateFacts < ActiveRecord::Migration[6.0]
  def change
    create_table :facts do |t|
      t.string :title
      t.string :headline
      t.string :text
      t.belongs_to :event
      t.timestamps
    end
  end
end
