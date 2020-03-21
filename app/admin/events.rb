ActiveAdmin.register Event do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :date, :admin_id, :initial_credits, collaborator_ids: [], participant_ids: [], song_ids: []

  form do |f|
    f.inputs "Add Event" do
      f.input :title
      f.input :admin
      f.input :date
      f.input :initial_credits
      f.input :songs, :as => :check_boxes
      f.input :collaborators, :as => :check_boxes
      f.input :participants, :as => :check_boxes
    end
    f.actions
  end
end
