class ChangeNameFromPublicToIsPublic < ActiveRecord::Migration[6.0]
  def change
    rename_column :events, :public, :is_public
  end
end
