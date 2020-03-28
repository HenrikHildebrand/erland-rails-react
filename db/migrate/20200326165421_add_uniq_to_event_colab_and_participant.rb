class AddUniqToEventColabAndParticipant < ActiveRecord::Migration[6.0]
  def change
    remove_index :events_participants, :user_id
    remove_index :events_participants, :event_id
    
    remove_index :events_collaborators, :event_id
    remove_index :events_collaborators, :user_id
        
    add_index :events_participants, [:user_id, :event_id], :unique => true
    add_index :events_collaborators, [:user_id, :event_id], :unique => true
  end
end
