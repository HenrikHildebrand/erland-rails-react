class V1::EventsController < V1::BaseController
    before_action :set_event, only: [:show, :edit, :update, :destroy, :participants, :join, :leave, :user_expenses]

    def_param_group :event_group do
        param :title, String
        param :date, Date
        param :admin_id, Integer
        param :initial_credits, Integer
        param :invite_only, [true, false]
        param :is_public, [true, false]
        param :free, [true, false]
        param :description, String
        param :location, String
    end

    api!
    def index
        @events = V1::Event.all
        render json: {
            all_events: @events,
            my_events: current_user.events
        }, status: :ok
    end

    api!
    def show
        if @event
            render json: @event
        else
            render json: {message: 'Unable to find that event.', error: get_error}, status: :unprocessable_entity
        end
    end

    api!
    def new
        @event = V1::Event.new
        render json: @event
    end

    api :POST, '/v1/events/:id', "Create an event"
    param_group :event_group
    def create
        @event = V1::Event.new(event_params)
        if @event.save
            render json: @event, status: :created
        else
            render json: {message: 'Unable to create new event.', error: get_error}, status: :unprocessable_entity
        end
    end

    api!
    def edit
        if @event
            render json: @event
        else
            render json: {message: 'Unable to find that event.'}, status: 404
        end
    end

    api :PUT, '/v1/events/:id', "Updates an event"
    param_group :event_group
    def update
        if @event
            if @event.update(event_params)
                render json: @event
            else
                render json: {error: get_error, message: 'Unable to update event.'}, status: :unprocessable_entity
            end
        else
            render json: {error: get_error, message: 'Unable to update event.'}, status: :unprocessable_entity
        end
    end

    api!
    def destroy
        if @event
            @event.destroy
            render json: {message: 'Event successfully deleted.'}, status: :ok
        else
            render json: {message: 'Unable to delete event.', error: get_error}, status: :unprocessable_entity
        end
    end

    api!
    description "Return all participants for event"
    def participants
        render json: @event.participants, event: @event, status: :ok
    end

    api :POST, '/v1/events/:id/join?{invite_token}', "An authenticated user joins an event"
    description "If the event is private the user must provide a valid invite token"
    def join
        if @event
            if @event.is_public
                add_participant_and_create_wallet
                return render json: {message: 'User successfully added to public event.'}, status: :ok
            elsif params[:invite_token]
                invite = @event.invites.find_by(invite_token: params[:invite_token])
                if invite 
                    if Date.today < invite.expire_at and invite.limit > 0
                        invite.limit -= 1
                        invite.save
                        add_participant_and_create_wallet
                        return render json: {message: 'User successfully added to private event.'}, status: :ok
                    else
                        message = 'Unable to join the event, either the time expired or the event is full.'
                    end
                else
                    message = 'Wrong invite token for event.'
                end
            else
                message = 'No invite token for the event.'
            end
        else
            message = 'No event with that id existed.'
        end
        return render json: {message: message, error: get_error}, status: :unprocessable_entity
    end

    api!
    def leave
        if @event
            if @event.participants.delete(current_user)
                return render json: {message: 'User successfully deleted from event.'}, status: :ok
            else
                return render json: {message: 'Unable to delete user from event.', error: get_error}, status: 400
            end
        else
            return render json: {message: 'Unable to find event with specified id.', error: get_error}, status: 400
        end
    end

    # GET /v1/event/:id/user_expenses
    # TODO: move this to model instead
    def user_expenses
        if @event
            @user_event_expenses = current_user.expenses.sum(:grand_total)
            @total_event_expense = @event.expenses.sum(:grand_total)
            @my_debt = (@total_event_expense / @event.participants.count) - @user_event_expenses
            render json: {
              my_expenses: @user_event_expenses,
              total_event_expense: @total_event_expense,
              my_debt: @my_debt
            }, status: :ok
        else
            render json: "Error", status: :bad_request
        end
    end

    private
    def event_params
        params.require(:event).permit(:title, :date, :admin_id,
                                      :admin, :initial_credits,
                                      :invite_only, :is_public,
                                      :free, :description, :location)
    end

    private
    def set_event
        @event = V1::Event.find_by_id(params[:id])
    end

    private
    def get_error
        @event.errors.messages
    end

    private
    def add_participant_and_create_wallet
        current_user.wallets.find_or_create_by(event_id: @event.id, credits: @event.initial_credits)
        unless @event.participants.include?(current_user)
            @event.participants << current_user
        end
    end
end
