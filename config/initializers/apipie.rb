Apipie.configure do |config|
  config.app_name                = "ErlandRailsReact"
  config.api_base_url            = ""
  config.doc_base_url            = "/docs"
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/**/*.rb"
  config.translate = false
  config.authenticate = Proc.new do
    authenticate_admin_user!
  end
end