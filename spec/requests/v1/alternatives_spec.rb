require 'rails_helper'

RSpec.describe "/v1/alternatives", type: :request do
  let(:valid_attributes) {
    FactoryBot.build(:alternative, :single).attributes
  }

  let(:invalid_attributes) {
    { title: nil }
  }

  let(:valid_headers) {{ "ACCEPT": "application/json" }}

  describe "GET /index" do
    it "renders a successful response" do
      puts valid_attributes
      V1::Alternative.create! valid_attributes
      get v1_alternatives_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      v1_alternative = V1::Alternative.create! valid_attributes
      get v1_alternative_url(v1_alternative), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new V1::Alternative" do
        expect {
          post v1_alternatives_url,
               params: valid_attributes, headers: valid_headers, as: :json
        }.to change(V1::Alternative, :count).by(1)
      end

      it "renders a JSON response with the new v1_alternative" do
        post v1_alternatives_url,
             params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create a new V1::Alternative" do
        expect {
          post v1_alternatives_url,
               params: invalid_attributes, as: :json
        }.to change(V1::Alternative, :count).by(0)
      end

      it "renders a JSON response with errors for the new v1_alternative" do
        post v1_alternatives_url,
             params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { title: "This is a new title" }
      }

      it "updates the requested v1_alternative" do
        v1_alternative = V1::Alternative.create! valid_attributes
        patch v1_alternative_url(v1_alternative),
              params: new_attributes, headers: valid_headers, as: :json
        v1_alternative.reload
        expect(v1_alternative.title).to eq(new_attributes[:title])
      end

      it "renders a JSON response with the v1_alternative" do
        v1_alternative = V1::Alternative.create! valid_attributes
        patch v1_alternative_url(v1_alternative),
              params: new_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the v1_alternative" do
        v1_alternative = V1::Alternative.create! valid_attributes
        patch v1_alternative_url(v1_alternative),
              params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested v1_alternative" do
      v1_alternative = V1::Alternative.create! valid_attributes
      expect {
        delete v1_alternative_url(v1_alternative), headers: valid_headers, as: :json
      }.to change(V1::Alternative, :count).by(-1)
    end
  end
end
