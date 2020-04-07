class V1::QuestionsController < ApplicationController
  before_action :set_v1_question, only: [:show, :update, :destroy]

  # GET /v1/questions
  # GET /v1/questions.json
  def index
    @v1_questions = V1::Question.all
    render json: @v1_questions.to_json(include: [:alternatives])
  end

  # GET /v1/questions/1
  # GET /v1/questions/1.json
  def show
  end

  # POST /v1/questions
  # POST /v1/questions.json
  def create
    @v1_question = V1::Question.new(v1_question_params)

    if @v1_question.save
      render :show, status: :created, location: @v1_question
    else
      render json: @v1_question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /v1/questions/1
  # PATCH/PUT /v1/questions/1.json
  def update
    if @v1_question.update(v1_question_params)
      render :show, status: :ok, location: @v1_question
    else
      render json: @v1_question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /v1/questions/1
  # DELETE /v1/questions/1.json
  def destroy
    @v1_question.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v1_question
      @v1_question = V1::Question.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v1_question_params
      params.fetch(:v1_question, {})
    end
end
