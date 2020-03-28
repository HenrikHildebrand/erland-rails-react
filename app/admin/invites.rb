ActiveAdmin.register Invite do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :event_id, :limit, :invite_token, :expire_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:event_id, :user_id, :email, :accepted]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
