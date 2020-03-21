class CreateAlternatives < ActiveRecord::Migration[6.0]
  def change
    create_table :alternatives do |t|
      t.string :title
      t.boolean :correct
      t.belongs_to :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
