ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :authentication_token
  #
  # or
  #
  # permit_params do
  #   permitted = [:email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :authentication_token]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end


  sidebar "User details", only: :show do
    attributes_table_for user do
      row :first_name
      row :last_name
      row :email
      row :created_at
      row :updated_at
    end
  end

  show do
    as_admin = user.events#by_customer is scope
    as_collaborator = user.events_as_collaborator
    as_participant = user.events_as_participant

    columns do
      h1 'Events for ' + user.email
      column max_width: "30%" do
        panel 'Admin' do
          paginated_collection(as_admin.page(params[:as_admin_page]).per(10), param_name: 'as_admin_page') do
            table_for(collection) do
              column(:title) {|e|link_to(e.title, admin_event_path(e)) }
              column :date
              column(:participants) {|e| e.participants.count}
            end
          end
        end
      end
      column max_width: "30%" do
        panel 'Collaborator' do
          paginated_collection(as_collaborator.page(params[:as_collaborator_page]).per(10), param_name: 'as_collaborator_page') do
            table_for(collection) do
              column(:title) {|e|link_to(e.title, admin_event_path(e)) }
              column :date
              column(:participants) {|e| e.participants.count}
            end
          end
        end
      end
      column max_width: "30%" do
        panel 'Participant' do
          paginated_collection(as_participant.page(params[:as_participant_page]).per(10), param_name: 'as_participant_page') do
            table_for(collection) do
              column(:title) {|e|link_to(e.title, admin_event_path(e)) }
              column :date
              column(:participants) {|e| e.participants.count}
            end
          end
        end
      end
    end
  end
end
