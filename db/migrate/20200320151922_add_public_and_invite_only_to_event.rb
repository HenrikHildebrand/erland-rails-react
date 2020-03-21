class AddPublicAndInviteOnlyToEvent < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :invite_only, :boolean
    add_column :events, :public, :boolean
    add_column :events, :initial_credits, :integer
  end
end
