class V1::BeerPackagesController < V1::BaseController
    def index
        if params[:event_id]
            event = Event.find_by_id(params[:event_id])
            # Check if event exists
            if event
                @beer_packages = event.beer_packages.all_beers(params[:user_id])
                render json: @beer_packages
            end
        else
            @all_beer_packages = BeerPackage.all_beers(params[:user_id])
            render json: {'all_beer_packages': @all_beer_packages}
        end
    end

    def show
        @beer_package = BeerPackage.find_by_id(params[:id])
        if @beer_package
            render json: @beer_package
        else
            render json: {message: 'Unable to find that beer package.'}
        end
    end

    def new
        @beer_package = BeerPackage.new
        render json: @beer_package
    end

    def create
        @beer_package = BeerPackage.new(beer_package_params)
        if @beer_package.save
            render json: @beer_package
        else
            render json: {error: 'Unable to create new beer package.', status: 400}
        end
    end

    def edit
        @beer_package = Event.find_by_id(params[:id])
        if @beer_package
            render json: @beer_package
        else
            render json: {error: 'Unable to find that beer package.', status: 400}
        end
    end

    def update
        @beer_package = BeerPackage.find_by_id(params[:id])
        if @beer_package
            @beer_package.update(beer_package_params)
            render json: {message: 'Beer package successfully updated.', status: 200}
        else
            render json: {error: 'Unable to update beer package.', status: 400}
        end
    end

    def destroy
        @beer_package = BeerPackage.find_by_id(params[:id])
        if @beer_package
            @beer_package.destroy
            render json: {message: 'Beer package successfully deleted.', status: 200}
        else
            render json: {error: 'Unable to delete beer package.', status: 400}
        end
    end

    private
    def beer_package_params
        params.permit(:event_id, :sender_id, :receiver_id, :accepted, :accepted_at)
    end
end
