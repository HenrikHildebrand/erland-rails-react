class V1::WalletsController < V1::BaseController
  before_action :set_wallet, only: [:show, :edit, :update, :destroy]

  def index
    if params.has_key?(:event_id)
      event = find_event
      if event
        render json: event.wallets
      else
        render json: {message: 'Could not find event with wallets'}, status: 404
      end
    else
      render json: {message: 'Could not find wallet for that event'}, status: 404
    end
  end

  def show
    if @wallet
      render json: @wallet
    else
      render json: {message: 'Unable not find wallet'}, status: :unprocessable_entity
    end
  end

  def new
    @wallet = V1::Wallet.new
    render json: @wallet
  end

  def create
    @wallet = V1::Wallet.new(wallet_params)
    if @wallet.save
      render json: @wallet
    else
      error = @wallet.errors.messages
      render json: {message: 'Unable to create new wallet.', error: get_errors}, status: 400
    end
  end

  def edit
    if @wallet
      render json: @wallet
    else
      render json: {message: 'Unable not find wallet', error: get_errors}, status: 404
    end
  end

  def update
    if @wallet.update_attributes(wallet_params)
      render json: {message: 'Wallet successfully updated.'}, status: 200
    else
      render json: {message: 'Unable to update wallet.', error: get_errors}, status: 400
    end
  end

  def destroy
    if @wallet
      @wallet.destroy
      render json: {message: 'Wallet successfully deleted.'}, status: 200
    else
      render json: {message: 'Unable to delete wallet.', error: get_errors}, status: 400
    end
  end

  private
  def wallet_params
    params.permit(:event_id, :user_id, :credits)
  end

  private
  def find_event
    V1::Event.find_by_id(params[:event_id])
  end

  private
  def set_wallet
    @wallet = V1::Wallet.find_by_id(params[:id])
  end

  private
  def get_errors
    @wallet.errors.messages
  end

end
