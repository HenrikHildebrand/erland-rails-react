require 'rails_helper'

RSpec.describe "/v1/events", type: :request do
  let(:valid_attributes) { FactoryBot.build(:event, :valid_event).attributes }
  let(:invalid_attributes) { FactoryBot.build(:event, :invalid_event).attributes }
  let(:valid_headers) {{ "ACCEPT": "application/json" }}

  describe "GET /index" do
    it "renders a successful response" do
      V1::Event.create! valid_attributes
      get v1_events_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      event = V1::Event.create! valid_attributes
      get v1_event_url(event), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new V1::Event" do
        expect {
          post v1_events_url,
               params: valid_attributes, headers: valid_headers, as: :json
        }.to change(V1::Event, :count).by(1)
      end

      it "renders a JSON response with the new v1_event" do
        post v1_events_url,
             params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json; charset=utf-8"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new V1::Event" do
        expect {
          post v1_events_url,
               params: invalid_attributes, as: :json
        }.to change(V1::Event, :count).by(0)
      end

      it "renders a JSON response with errors for the new v1_event" do
        post v1_events_url,
             params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested v1_event" do
        event = V1::Event.create! valid_attributes
        patch v1_event_url(event),
              params: invalid_attributes, headers: valid_headers, as: :json
        event.reload
        skip("Add assertions for updated state")
      end

      it "renders a JSON response with the v1_event" do
        event = V1::Event.create! valid_attributes
        patch v1_event_url(event),
              params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the v1_event" do
        event = V1::Event.create! valid_attributes
        patch v1_event_url(event),
              params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested v1_event" do
      event = V1::Event.create! valid_attributes
      expect {
        delete v1_event_url(event), headers: valid_headers, as: :json
      }.to change(V1::Event, :count).by(-1)
    end
  end
end
