class V1::BaseController < ActionController::API
    include ActionController::MimeResponds
    protect_from_forgery with: :exception
    # skip_before_action :verify_authenticity_token
    before_action :authenticate_user!
    acts_as_token_authentication_handler_for User

end 