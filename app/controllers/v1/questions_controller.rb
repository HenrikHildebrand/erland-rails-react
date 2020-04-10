class V1::QuestionsController < V1::BaseController
  before_action :set_v1_question, only: [:show, :update, :destroy]

  # GET /v1/questions
  # GET /v1/questions.json
  def index
    if get_event
      @v1_questions = @event.questions
      render json: @v1_questions
    else
      @v1_questions = V1::Question.all
      render json: @v1_questions
    end
  end

  # GET /v1/questions/1
  # GET /v1/questions/1.json
  def show
    if @v1_question
      render json: @v1_question
    else
      render json: get_errors, status: :unprocessable_entity
    end
  end

  # POST /v1/questions
  # POST /v1/questions.json
  def create
    @v1_question = V1::Question.new(v1_question_params)

    if @v1_question.save
      render json: @v1_question, status: :created
    else
      render json: get_errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /v1/questions/1
  # PATCH/PUT /v1/questions/1.json
  def update
    if @v1_question.update(v1_question_params)
      render json: @v1_question, status: :ok
    else
      render json: get_errors, status: :unprocessable_entity
    end
  end

  # DELETE /v1/questions/1
  # DELETE /v1/questions/1.json
  def destroy
    if @v1_question.destroy
      render json: {'message': 'Deleted question successfully'}, status: :ok
    else
      render json: get_errors, status: :unprocessable_entity
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v1_question
      @v1_question = V1::Question.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v1_question_params
      params.permit(:event_id, :title, :lat, :lng, alternatives_attributes: [:id, :title, :correct])
    end

  def get_event
    @event = Event.find_by(id: params[:event_id])
  end

  def get_errors
    @v1_question.errors.messages
  end

end
