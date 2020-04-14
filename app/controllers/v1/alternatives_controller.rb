class V1::AlternativesController < V1::BaseController
  before_action :set_v1_alternative, only: [:show, :update, :destroy]

  # GET /v1/alternatives
  # GET /v1/alternatives.json
  def index
    if get_event
    @v1_alternatives = @event.alternatives
    render json: @v1_alternatives
  else
    @v1_alternatives = V1::Question.all
    render json: @v1_alternatives
  end
  end

  # GET /v1/alternatives/1
  # GET /v1/alternatives/1.json
  def show
    if @v1_alternative
      render json: @v1_alternative
    else
      render json: get_errors(@v1_alternative), status: :unprocessable_entity
    end
  end

  # POST /v1/alternatives
  # POST /v1/alternatives.json
  def create
    @v1_alternative = V1::Alternative.new(v1_alternative_params)

    if @v1_alternative.save
      render json: @v1_alternative, status: :created
    else
      render json: @v1_alternative.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /v1/alternatives/1
  # PATCH/PUT /v1/alternatives/1.json
  def update
    if @v1_alternative.update(v1_alternative_params)
      render json: @v1_alternative, status: :ok
    else
      render json: @v1_alternative.errors, status: :unprocessable_entity
    end
  end

  # DELETE /v1/alternatives/1
  # DELETE /v1/alternatives/1.json
  def destroy
    @v1_alternative.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v1_alternative
      @v1_alternative = V1::Alternative.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v1_alternative_params
      params.permit(:title, :correct, :question_id)
    end
end
