class V1::EventsController < V1::BaseController
    def index
        @events = Event.all
        render json: {
            all_events: @events,
            my_events: @events.where(admin_id: current_user.id)
        }
    end

    def show
        @event = Event.find(params[:id])
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
        @event = Event.find(params[:id])
        if @event
            render json: @event
        else
            render json: {error: 'Unable to find that event.', status: 400}
        end

    end

    def update
        @event = Event.find(params[:id])
        if @event
            @event.update(event_params)
            render json: {message: 'Event successfully updated.', status: 200}
        else
            render json: {error: 'Unable to update event.', status: 400}
        end
    end

    def destroy
        @event = Event.find(params[:id])
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

end