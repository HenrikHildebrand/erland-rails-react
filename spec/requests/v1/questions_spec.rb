require 'rails_helper'

RSpec.describe "/v1/questions", type: :request do
  let(:valid_attributes) {
    FactoryBot.build(:question_with_alternatives)
  }

  let(:invalid_attributes) {
    FactoryBot.build(:question, :invalid_question)
  }

  let(:valid_headers) {{ "ACCEPT": "application/json" }}

  describe "GET /index" do
    it "renders a successful response" do
      FactoryBot.create(:question_with_alternatives)
      get v1_questions_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      v1_question = FactoryBot.create(:question_with_alternatives)
      get v1_question_url(v1_question), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new V1::Question" do
        expect {
          post v1_questions_url,
               params: valid_attributes, headers: valid_headers, as: :json
        }.to change(V1::Question, :count).by(1)
      end

      it "renders a JSON response with the new v1_question" do
        post v1_questions_url,
             params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create a new V1::Question" do
        expect {
          post v1_questions_url,
               params: invalid_attributes, as: :json
        }.to change(V1::Question, :count).by(0)
      end

      it "renders a JSON response with errors for the new v1_question" do
        post v1_questions_url,
             params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {{lat: 57.00, lng: 11.00, title: "A new title"}}

      it "updates the requested v1_question" do
        v1_question = FactoryBot.create(:question_with_alternatives)
        patch v1_question_url(v1_question),
              params: new_attributes, headers: valid_headers, as: :json
        v1_question.reload
        expect(v1_question.lat).to eq(new_attributes[:lat])
        expect(v1_question.lng).to eq(new_attributes[:lng])
        expect(v1_question.title).to eq(new_attributes[:title])
      end

      it "renders a JSON response with the v1_question" do
        v1_question = FactoryBot.create(:question_with_alternatives)
        patch v1_question_url(v1_question),
              params: new_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the v1_question" do
        v1_question = FactoryBot.create(:question_with_alternatives)
        patch v1_question_url(v1_question),
              params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested v1_question" do
      v1_question = FactoryBot.create(:question_with_alternatives)
      expect {
        delete v1_question_url(v1_question), headers: valid_headers, as: :json
      }.to change(V1::Question, :count).by(-1)
    end
  end
end
