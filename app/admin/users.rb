ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at, :authentication_token, :password, :password_confirmation
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

    tabs do
      tab 'Events' do
        columns do
          h1 'Events for ' + user.email
          column max_width: "30%" do
            panel 'Admin', class: 'sidebar_section panel' do
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
            panel 'Collaborator', class: 'sidebar_section panel' do
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
            panel 'Participant', class: 'sidebar_section panel' do
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
      tab 'Answers' do
        table_for user.answers, class: 'index_table index' do
          column('Event'){|a| link_to(a.event.title, admin_event_path(a.event))}
          column :alternative
          column('Correct') {|a| a.alternative.correct}
        end
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys # shows errors on :base
    f.actions
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :authentication_token
    end
    f.actions
  end

end
