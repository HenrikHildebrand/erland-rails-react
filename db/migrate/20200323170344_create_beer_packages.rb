class CreateBeerPackages < ActiveRecord::Migration[6.0]
  def change
    create_table :beer_packages do |t|
      t.references :event, null: false, foreign_key: true
      t.references :sender
      t.references :receiver
      t.boolean :accepted
      t.datetime :accepted_at

      t.timestamps
    end
    add_foreign_key :beer_packages, :users, column: :sender_id, primary_key: :id
    add_foreign_key :beer_packages, :users, column: :receiver_id, primary_key: :id
  end
end
