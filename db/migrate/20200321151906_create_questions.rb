class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :title
      t.float :lat, default: 57.69850253087
      t.float :lng, default: 11.974941605476417
      t.belongs_to :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
