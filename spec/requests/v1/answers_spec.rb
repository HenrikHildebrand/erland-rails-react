require 'rails_helper'

RSpec.describe "/v1/answers", type: :request do
  let(:valid_attributes) {
    FactoryBot.build(:answer, :single).attributes
  }

  let(:invalid_attributes) {
    { alternative_id: nil }
  }

  let(:valid_headers) {{ "ACCEPT": "application/json" }}

  describe "GET /index" do
    it "renders a successful response" do
      V1::Answer.create! valid_attributes
      get v1_answers_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      v1_answer = V1::Answer.create! valid_attributes
      get v1_answer_url(v1_answer), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new V1::Answer" do
        expect {
          post v1_answers_url,
               params: valid_attributes, headers: valid_headers, as: :json
        }.to change(V1::Answer, :count).by(1)
      end

      it "renders a JSON response with the new v1_answer" do
        post v1_answers_url,
             params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create a new V1::Answer" do
        expect {
          post v1_answers_url,
               params: invalid_attributes, as: :json
        }.to change(V1::Answer, :count).by(0)
      end

      it "renders a JSON response with errors for the new v1_answer" do
        post v1_answers_url,
             params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested v1_answer" do
      v1_answer = V1::Answer.create! valid_attributes
      expect {
        delete v1_answer_url(v1_answer), headers: valid_headers, as: :json
      }.to change(V1::Answer, :count).by(-1)
    end
  end
end
