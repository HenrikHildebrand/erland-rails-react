class CreateBeerPackages < ActiveRecord::Migration[6.0]
  def change
    create_table :beer_packages do |t|
      t.belongs_to :event
      t.belongs_to :sender
      t.belongs_to :receiver
      t.boolean :accepted
      t.datetime :accepted_at

      t.timestamps
    end
  end
end
