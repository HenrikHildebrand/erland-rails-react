class HomeController < ApplicationController

  # skip_before_action :authenticate_user!

  def index
    unless user_signed_in?
      redirect_to new_user_session_path
    end
  end

  def signed_out
    sign_out current_user
    redirect_to new_user_session_url
  end

end
