ActiveAdmin.register Song do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :text, :public
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :text]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end


  form do |f|
    f.semantic_errors *f.object.errors.keys # shows errors on :base
    f.actions         # adds the 'Submit' and 'Cancel' buttons
    f.inputs do
      f.input :title
      f.input :text, as: :text
      f.input :public
    end
    f.actions         # adds the 'Submit' and 'Cancel' buttons
  end
end
