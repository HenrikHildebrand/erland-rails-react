class V1::WalletsController < V1::BaseController
  before_action :set_wallet, only: [:show, :edit, :update, :destroy]

  def index
    puts user

    if params[:event_id]
      event = find_event
      # check if event exists
      if event
        # check if looking for user wallet
        if params[:user_id]
          @user_wallet = event.wallets.where(user_id: params[:user_id])
          render json: @user_wallet
        # else return the events wallets
        else
          @event_wallets = event.wallets
          render json: @event_wallets
        end
      else
        render json: {error: 'Could not find wallet for that event', status: 404}
      end
    else
      # dont know if it make sense to return all wallets for a user
      render json: {all_wallets: []}
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
      @messages = @wallet.errors.messages
      render json: {error: 'Unable to create new wallet.', messages: @messages, status: 400}
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
