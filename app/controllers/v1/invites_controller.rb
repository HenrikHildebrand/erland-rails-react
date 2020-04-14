class V1::InvitesController < V1::BaseController
    before_action :set_invite, only: [:show, :edit, :update, :destroy]

    def index
        @invites = V1::Invite.all
        render json: @invites
    end

    def show
        if @invite
            render json: @invite
        else
            render json: {message: 'Unable to find that invite.'}, status: 400
        end
    end

    def new
        @invite = V1::Invite.new
        render json: @invite
    end

    def create
        @invite = V1::Invite.new(invite_params)
        if @invite.save
            render json: @invite, status: :created
        else
            error = @invite.errors.messages
            render json: {message: 'Unable to create new invite.', error: error}, status: :unprocessable_entity
        end
    end

    def edit
        if @invite
            render json: @invite
        else
            render json: {error: 'Unable to find that invite.'}, status: 404
        end
    end

    def update
        if @invite
            if @invite.update(invite_params)
                render json: {message: 'Invite successfully updated.'}, status: :ok
            else
                render json: {error: 'Unable to update invite.'}, status: :unprocessable_entity
            end
        else
            render json: {error: 'Unable to update invite.'}, status: :unprocessable_entity
        end
    end

    def destroy
        if @invite
            @invite.destroy
            render json: {message: 'Invite successfully deleted.'}, status: :ok
        else
            render json: {error: 'Unable to delete invite.'}, status: :unprocessable_entity
        end
    end

    private
    def invite_params
        params.permit(:event_id, :event, :expire_at, :invite_token, :limit)
    end

    private
    def set_invite
        @invite = V1::Invite.find_by_id(params[:id])
    end
end
