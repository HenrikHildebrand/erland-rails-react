class AddPublicToSong < ActiveRecord::Migration[6.0]
  def change
    add_column :songs, :public, :boolean
  end
end
