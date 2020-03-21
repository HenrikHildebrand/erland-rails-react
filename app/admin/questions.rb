ActiveAdmin.register Question do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title,
                :lat,
                :lng,
                :event_id,
                alternatives_attributes: [:id, :_destroy, :question_id, :title, :correct]
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :lat, :lng, :event_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end


  form do |f|
    f.semantic_errors *f.object.errors.keys # shows errors on :base
    f.actions         # adds the 'Submit' and 'Cancel' buttons
    tabs do
      tab 'Details' do
        f.inputs 'Location' do
          f.input :title
          f.input :event
          f.input :lat
          f.input :lng
          render partial: 'admin/location_form', locals: {f: f}
        end
      end
      tab 'Alternatives' do
        f.has_many :alternatives, allow_destroy: true do |alt|
          alt.inputs "Alternative" do
            alt.input :title
            alt.input :correct
          end
        end
      end
    end
    f.actions         # adds the 'Submit' and 'Cancel' buttons
  end

end
