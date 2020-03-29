class V1::WalletsController < V1::BaseController
  before_action :set_wallet, only: [:show, :edit, :update, :destroy]

  def index
    if params[:event_id]
      event = find_event
      # check if event exists
      if event
        # check if looking for user wallet
        render json: event.wallets
        # else return the events wallets
      else
        render json: { error: 'Could not find event with wallets', status: 404}
      end
    else
      render json: {error: 'Could not find wallet for that event', status: 404}
    end
  end

  def show
    if @wallet
      render json: @wallet
    else
      render json: {error: 'Unable not find wallet', status: 404}  
    end
  end

  def new
    @wallet = Wallet.new
    render json: @wallet
  end

  def create
    @wallet = Wallet.new(wallet_params)
    if @wallet.save
      render json: @wallet
    else
      error = @wallet.errors.messages
      render json: {message: 'Unable to create new wallet.', error: error, status: 400}
    end
  end

  def edit
    if @wallet
      render json: @wallet
    else
      render json: {error: 'Unable not find wallet', status: 404}  
    end
  end

  def update
    if @wallet.update_attributes(wallet_params)
      render json: {message: 'Wallet successfully updated.', status: 200}
    else
      render json: {error: 'Unable to update wallet.', messages: @wallet.errors.messages, status: 400}
    end
  end

  def destroy
    if @wallet
      @wallet.destroy
      render json: {message: 'Wallet successfully deleted.', status: 200}
    else
      render json: {error: 'Unable to delete wallet.', messages: @wallet.errors.messages, status: 400}
    end
  end

  private
  def wallet_params
    params.permit(:event_id, :user_id, :credits)
  end

  def find_event
    Event.find_by_id(params[:event_id])
  end

  def set_wallet
    @wallet = Wallet.find_by_id(params[:id])
  end

end
