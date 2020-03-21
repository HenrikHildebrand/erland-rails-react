ActiveAdmin.register BeerPackage do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :event_id, :sender_id, :receiver_id, :accepted, :accepted_at

  form do |f|
    f.inputs "Add Event" do
      f.input :event_id, :as => :select, :collection => Event.all
      f.input :sender_id, :as => :select, :collection => User.all
      f.input :receiver_id, :as => :select, :collection => User.all
      f.input :accepted
      f.input :accepted_at
    end
    f.actions
  end
  
end
