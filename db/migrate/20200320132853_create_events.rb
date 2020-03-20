class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :date

      t.references :admin, null: false, index: true

      t.timestamps
    end

    create_table :events_participants do |t|
      t.references :user, index: true
      t.references :event, index: true
    end

    create_table :events_collaborators do |t|
      t.references :user, index: true
      t.references :event, index: true
    end

    add_foreign_key :events, :users, column: :admin_id
  end
end
