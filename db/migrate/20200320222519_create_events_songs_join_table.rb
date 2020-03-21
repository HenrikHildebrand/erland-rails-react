class CreateEventsSongsJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :events, :songs
  end
end
