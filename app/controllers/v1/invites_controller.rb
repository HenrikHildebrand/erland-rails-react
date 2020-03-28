class V1::InvitesController < V1::BaseController
    before_action :set_invite, only: [:show, :edit, :update, :destroy]

    def index
        @invites = Invite.all
        render json: @invites
    end

    def show
        if @invite
            render json: @invite
        else
            render json: {message: 'Unable to find that invite.'}
        end
    end

    def new
        @invite = Invite.new
        render json: @invite
    end

    def create
        @invite = Invite.new(invite_params)
        if @invite.save
            render json: @invite
        else
            render json: {error: 'Unable to create new invite.', status: 400}
        end
    end

    def edit
        if @invite
            render json: @invite
        else
            render json: {error: 'Unable to find that invite.', status: 404}
        end
    end

    def update
        if @invite
            @invite.update(invite_params)
            render json: {message: 'Invite successfully updated.', status: 200}
        else
            render json: {error: 'Unable to update invite.', status: 400}
        end
    end

    def destroy
        if @invite
            @invite.destroy
            render json: {message: 'Invite successfully deleted.', status: 200}
        else
            render json: {error: 'Unable to delete invite.', status: 400}
        end
    end

    private
    def invite_params
        params.permit(:event_id, :expire_at, :invite_token, :limit)
    end

    private
    def set_invite
        @invite = Invite.find_by_id(params[:id])
    end

end
