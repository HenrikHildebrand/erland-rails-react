class V1::ExpensesController < V1::BaseController
  before_action :set_v1_expense, only: [:show, :update, :destroy]

  # GET /v1/expenses
  # GET /v1/expenses.json
  def index
    if current_event
      @v1_expenses = current_event.expenses
      render json: @v1_expenses
    else
      render json: {message: "No id was specified"}, status: :bad_request
    end
  end

  # GET /v1/expenses/1
  # GET /v1/expenses/1.json
  def show
    if @v1_expense
      render json: @v1_expense
    else
      render json: get_errors(@v1_expense), status: :unprocessable_entity
    end
  end

  # POST /v1/expenses
  # POST /v1/expenses.json
  def create
    @v1_expense = current_event.expenses.new(v1_expense_params)
    @v1_expense.creator_id = current_user.id
    if @v1_expense.save
      render json: @v1_expense, each_serializer: ExpenseSerializer, status: :created
    else
      render json: @v1_expense.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /v1/expenses/1
  # PATCH/PUT /v1/expenses/1.json
  def update
    if @v1_expense.update(v1_expense_params)
      render json: @v1_expense, status: :ok
    else
      render json: @v1_expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /v1/expenses/1
  # DELETE /v1/expenses/1.json
  def destroy
    @v1_expense.destroy
  end

  def collect
    all_expenses = current_event.expenses.sum(:grand_total)
    render json: all_expenses
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v1_expense
      @v1_expense = V1::Expense.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v1_expense_params
        params.permit(:grand_total, :event_id, :creator_id, :custom_debt, debtor_ids: [])
    end
end