class AddUniqunessToWallet < ActiveRecord::Migration[6.0]
  def change
    add_index :wallets, [:event_id, :user_id], :unique => true
  end
end
