class AddIndexToJoinTableEventsSong < ActiveRecord::Migration[6.0]
  def change
    add_index :events_songs, [:song_id, :event_id], unique: true
  end
end
