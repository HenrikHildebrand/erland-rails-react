ActiveAdmin.register Event do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :date, :admin_id, :initial_credits, collaborator_ids: [], participant_ids: [], song_ids: []

  sidebar "Event details", only: :show do
    attributes_table_for event do
      row :title
      row :admin
      row('Participants'){|e| e.participants.count}
      row('Questions'){|e| e.questions.count}
      row('Answers'){|e| e.answers.count}
    end
  end

  form do |f|
    f.inputs "Add Event" do
      f.input :title
      f.input :adminGIT
      f.input :date
      f.input :initial_credits
      f.input :songs, collection: Song.all
      f.input :collaborators, collection: User.all
      f.input :participants, collection: User.all
    end
    f.actions
  end
end
