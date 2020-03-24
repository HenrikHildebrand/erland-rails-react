class V1::EventsController < V1::BaseController
    before_action :set_event, only: [:show, :edit, :update, :destroy]

    def index
        @events = Event.all
        render json: {
            all_events: @events,
            my_events: current_user.events
        }
    end

    def show
        if @event
            render json: @event
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
            render json: @event
        else
            render json: {error: 'Unable to create new event.', status: 400}
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

    private
    def event_params
        params.permit(:admin, :title, :date, :collaborators, :participants)
    end

    def set_event
        @event = Event.find_by_id(params[:id])
    end

end
