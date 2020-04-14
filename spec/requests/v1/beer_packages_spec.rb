require 'rails_helper'

RSpec.describe "/v1/beer_packages", type: :request do
  let(:valid_attributes) {
    {
      event_id: FactoryBot.create(:valid_not_public_event).id,
      sender_id: @user.id,
      receiver_id: FactoryBot.create(:user, :valid_user).id
    }
  }

  let(:invalid_attributes) {
    {
      event_id: -5,
      receiver_id: "4",
      accepted: "true"
    }
  }

  let(:valid_headers) {{ "ACCEPT": "application/json" }}

  describe "GET /index" do
    it "renders a successful response for all beers send by a user" do
      V1::BeerPackage.create! valid_attributes
      get v1_beer_packages_url, as: :json
      expect(response).to be_successful
    end
    it "renders a successful response for all beers send by a user for a specific event" do
      V1::BeerPackage.create! valid_attributes
      get v1_beer_packages_url, params: {event_id: valid_attributes[:event_id]}, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      v1_beer_package = V1::BeerPackage.create! valid_attributes
      get v1_beer_package_url(v1_beer_package), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new V1::BeerPackage" do
        expect {
          post v1_beer_packages_url,
               params: valid_attributes, headers: valid_headers, as: :json
        }.to change(V1::BeerPackage, :count).by(1)
      end

      it "renders a JSON response with the new v1_beer_package" do
        post v1_beer_packages_url,
             params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create a new V1::BeerPackage" do
        expect {
          post v1_beer_packages_url,
               params: invalid_attributes, as: :json
        }.to change(V1::BeerPackage, :count).by(0)
      end

      it "renders a JSON response with errors for the new v1_beer_package" do
        post v1_beer_packages_url,
             params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    let(:new_attributes) {
      {
        event_id: FactoryBot.create(:valid_not_public_event).id,
        sender_id: FactoryBot.create(:user, :valid_user).id,
        receiver_id: @user.id
      }
    }
    let(:update_attributes) {{accepted: true}}

    context "with valid parameters" do
      it "updates the requested v1_beer_package" do
        v1_beer_package = V1::BeerPackage.create! new_attributes
        patch v1_beer_package_url(v1_beer_package),
              params: update_attributes, headers: valid_headers, as: :json
        v1_beer_package.reload
        expect(response).to have_http_status(:ok)
        expect(v1_beer_package.accepted).to_not be_nil
        expect(v1_beer_package.accepted_at).to_not be_nil
      end

      it "renders a JSON response with the v1_beer_package" do
        v1_beer_package = V1::BeerPackage.create! new_attributes
        patch v1_beer_package_url(v1_beer_package),
              params: update_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the v1_beer_package" do
        v1_beer_package = V1::BeerPackage.create! valid_attributes
        patch v1_beer_package_url(v1_beer_package),
              params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested v1_beer_package" do
      v1_beer_package = V1::BeerPackage.create! valid_attributes
      expect {
        delete v1_beer_package_url(v1_beer_package), headers: valid_headers, as: :json
      }.to change(V1::BeerPackage, :count).by(-1)
    end
  end
end
