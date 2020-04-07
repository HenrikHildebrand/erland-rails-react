ActiveAdmin.register BeerPackage do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :event_id, :sender_id, :receiver_id, :accepted, :accepted_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:event_id, :sender_id, :receiver_id, :accepted, :accepted_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
