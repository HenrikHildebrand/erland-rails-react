class V1::BeerPackagesController < V1::BaseController
    before_action :set_beer_package, only: [:show, :edit, :update, :destroy]

    def index
        if params[:event_id]
            event = find_event
            # Check if event exists
            if event
                @beer_packages = event.beer_packages.all_beers(current_user)
                render json: @beer_packages
            else
                render json: {error: 'Could not find beers for event'}, status: 404
            end
        else
            render json: {all_beer_packages: all_beers_for_current_user}
        end
    end

    def show
        if @beer_package
            render json: @beer_package
        else
            render json: {message: 'Unable to find that beer package.'}, status: 404
        end
    end

    def new
        @beer_package = V1::BeerPackage.new
        render json: @beer_package
    end

    def create
        @beer_package = V1::BeerPackage.new(beer_package_params)
        if @beer_package.save
            render json: @beer_package, status: :created
        else
            render json: {message: 'Unable to create new beer package.', error: get_errors}, status: :unprocessable_entity
        end
    end

    def edit
        if @beer_package
            render json: @beer_package
        else
            render json: {message: 'Unable to find that beer package.', error: get_errors}, status: 404
        end
    end

    def update
        if @beer_package.update(beer_package_params)
            render json: {message: 'Beer package successfully updated.'}, status: :ok
        else
            render json: {message: 'Unable to update beer package.', error: get_errors}, status: :unprocessable_entity
        end
    end

    def destroy
        if @beer_package
            @beer_package.destroy
            render json: {message: 'Beer package successfully deleted.'}, status: :ok
        else
            render json: {message: 'Unable to delete beer package.'}, status: 400
        end
    end

    private
    def beer_package_params
        params.permit(:event_id, :sender_id, :receiver_id, :accepted, :accepted_at)
    end

    def set_beer_package
        @beer_package = V1::BeerPackage.find_by_id(params[:id])
    end

    def find_event
        Event.find_by_id(params[:event_id])
    end

    def all_beers_for_current_user
        V1::BeerPackage.all_beers(current_user.id)
    end

    def get_errors
        @beer_package.errors.messages
    end
end
