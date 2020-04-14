class V1::AnswersController < V1::BaseController
  before_action :set_v1_answer, only: [:show, :update, :destroy]

  # GET /v1/answers
  # GET /v1/answers.json
  def index
    if get_event
      @v1_answers = @event.alternatives
      render json: @v1_answers
    else
      @v1_answers = V1::Answer.all
      render json: @v1_answers
    end
  end

  # GET /v1/answers/1
  # GET /v1/answers/1.json
  def show
    if @v1_answer
      render json: @v1_alternative
    else
      render json: get_errors(@v1_alternative), status: :unprocessable_entity
    end
  end

  # POST /v1/answers
  # POST /v1/answers.json
  def create
    @v1_answer = current_user.answers.new(v1_answer_params)
    if @v1_answer.save
      render json: @v1_answer, status: :created
    else
      render json: @v1_answer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /v1/answers/1
  # PATCH/PUT /v1/answers/1.json
  def update
    # Do not support updating an answer for now
    # Once you have answered there is no return
  end

  # DELETE /v1/answers/1
  # DELETE /v1/answers/1.json
  def destroy
    @v1_answer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v1_answer
      @v1_answer = V1::Answer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v1_answer_params
      params.permit(:alternative_id)
    end
end