class V1::BaseController < ActionController::Base
    acts_as_token_authentication_handler_for User
    skip_before_action :verify_authenticity_token

    def current_event
        @current_event ||= Event.find_by(id: params[:event_id])
    end

    def get_event
        @event = V1::Event.find_by(id: params[:event_id])
    end

    def get_errors(model)
        model.errors.messages
    end
end