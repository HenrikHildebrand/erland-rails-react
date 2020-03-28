class CreateInvites < ActiveRecord::Migration[6.0]
  def change
    create_table :invites do |t|
      t.references :event, null: false, foreign_key: true
      t.string :invite_token
      t.integer :limit
      t.datetime :expire_at

      t.timestamps
    end
  end
end
