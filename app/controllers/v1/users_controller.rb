class V1::UsersController < V1::BaseController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    if params[:event_id]
      event = find_event
      if event
        render json: {
            participants: event.participants,
            collaborators: event.collaborators,
            admin: event.admin
        }
      else
        render json: {error: 'Could not find event with users', status: 400}
      end
    else
      render json: all_users
    end
  end

  def show
    if @user
      render json: @user
    else
      render json: {message: 'Unable to find user.', status: 404}
    end
  end

  def new
    @user = V1::User.new
    render json: @user
  end

  def create
    user = V1::User.new(user_params)
    if @user.save
      render json: @user
    else
      @messages = @user.errors.messages
      render json: {error: 'Unable to create new user.', messages: @messages, status: 400}
    end
  end

  def edit
    if @user
      render json: @user
    else
      render json: {error: 'Unable to find user.', status: 404}
    end
  end

  def update
    if @user.update_attributes(user_params)
      render json: {message: 'User successfully updated.', status: 200}
    else
      render json: {error: 'Unable to update user.', messages: @user.errors.messages, status: 400}
    end
  end

  def destroy
    if @user
      @user.destroy
      render json: {message: 'User successfully deleted.', status: 200}
    else
      render json: {error: 'Unable to delete user.', status: 400}
    end
  end

  private

  def user_params
    params.permit(:id, :first_name, :last_name, :email, :password, :password_confirmation)
  end

  def find_event
    V1::Event.find_by_id(params[:event_id])
  end

  def all_users
    V1::User.all
  end

  def set_user
    @user = current_user
  end

end