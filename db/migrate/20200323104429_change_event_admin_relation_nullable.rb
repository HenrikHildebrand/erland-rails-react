class ChangeEventAdminRelationNullable < ActiveRecord::Migration[6.0]
  def change
    change_column_null(:events, :admin_id, true)
  end
end
