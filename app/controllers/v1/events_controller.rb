class V1::EventsController < V1::BaseController
    before_action :set_event, only: [:show, :edit, :update, :destroy, :join, :leave]

    def index
        @events = V1::Event.all
        render json: {
            all_events: @events,
            my_events: current_user.events
        }, status: :ok
    end

    def show
        if @event
            render json: {
                event: @event, 
                participants: @event.participants
            }, status: :ok
        else
            render json: {message: 'Unable to find that event.', error: get_error}, status: :unprocessable_entity
        end
    end

    def new
        @event = V1::Event.new
        render json: @event
    end

    def create
        @event = V1::Event.new(event_params)
        if @event.save
            render json: @event, status: :created
        else
            render json: {message: 'Unable to create new event.', error: get_error}, status: :unprocessable_entity
        end
    end

    def edit
        if @event
            render json: @event
        else
            render json: {message: 'Unable to find that event.'}, status: 404
        end
    end

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

    def destroy
        if @event
            @event.destroy
            render json: {message: 'Event successfully deleted.'}, status: :ok
        else
            render json: {message: 'Unable to delete event.', error: get_error}, status: :unprocessable_entity
        end
    end

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

    private
    def event_params
        params.require(:event).permit(:title, :date, :admin_id, :admin, :initial_credits, :invite_only, :is_public)
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
        @event.participants << current_user
    end
end
