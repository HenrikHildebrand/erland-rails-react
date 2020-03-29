class V1::EventsController < V1::BaseController
    before_action :set_event, only: [:show, :edit, :update, :destroy, :join, :leave]

    def index
        @events = Event.all
        render json: {
            all_events: @events,
            my_events: current_user.events
        }
    end

    def show
        if @event
            render json: {
                event: @event, 
                participants: @event.participants
            }
        else
            render json: {message: 'Unable to find that event.'}
        end
    end

    def new
        @event = Event.new
        render json: @event
    end

    def create
        @event = Event.new(event_params)
        if @event.save
            render json: {event: @event, status: 201}
        else
            error = @event.errors.messages
            render json: {message: 'Unable to create new event.', error: error}, status: 400
        end
    end

    def edit
        if @event
            render json: @event
        else
            render json: {error: 'Unable to find that event.', status: 404}
        end
    end

    def update
        if @event
            @event.update(event_params)
            render json: {message: 'Event successfully updated.', status: 200}
        else
            render json: {error: 'Unable to update event.', status: 400}
        end
    end

    def destroy
        if @event
            @event.destroy
            render json: {message: 'Event successfully deleted.', status: 200}
        else
            render json: {error: 'Unable to delete event.', status: 400}
        end
    end

    def join
        if @event
            if @event.public
                @event.participants << current_user
                render json: {message: 'User successfully added to event.', status: 200}
            elsif params[:invite_token]
                invite = @event.invites.find_by(invite_token: params[:invite_token])
                if invite 
                    puts invite.expire_at
                    if Date.today < invite.expire_at and invite.limit > 0
                        invite.limit -= 1
                        invite.save
                        @event.participants << current_user
                        render json: {message: 'User successfully added to event.', status: 200}
                    else
                        error = 'Unable to join the event, either the time expired or the event is full.'
                    end
                else
                    error = 'Wrong invite token for event.'
                end
            else
                error = 'No invite token for the event.'
            end
        else
            error = 'No event with that id existed.'
        end
        render json: {error: error, status: 400}
    end

    def leave
        if @event
            if @event.participants.delete(current_user)
                render json: {message: 'User successfully deleted from event.', status: 200}
            else
                render json: {error: 'Unable to delete user from event.', status: 400}
            end
        else
            render json: {error: 'Unable to find event with specified id.', status: 400}
        end
    end

    private
    def event_params
        params.require(:event).permit(:title, :date, :admin_id)
    end

    def set_event
        @event = Event.find_by_id(params[:id])
    end

end
