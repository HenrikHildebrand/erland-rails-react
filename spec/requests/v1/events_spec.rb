require 'rails_helper'

RSpec.describe "/v1/events", type: :request do
  let(:valid_attributes) { FactoryBot.build(:valid_not_public_event).attributes }
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

      it "updates the requested v1_event" do
          v1_event = V1::Event.create! valid_attributes
        patch v1_event_url(v1_event),
              params: valid_attributes, headers: valid_headers, as: :json
          v1_event.reload
          expect(response).to have_http_status(:ok)
          expect(response_body['data']['attributes']['title']).to eq(v1_event.title)
          expect(response_body['data']['attributes']['admin-id']).to eq(v1_event.admin_id)
      end

      it "renders a JSON response with the v1_event" do
          v1_event = V1::Event.create! valid_attributes
          patch v1_event_url(v1_event),
                params: valid_attributes, headers: valid_headers, as: :json
          expect(response).to have_http_status(:ok)
          expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the v1_event" do
          v1_event = V1::Event.create! valid_attributes
          patch v1_event_url(v1_event),
                params: invalid_attributes, headers: valid_headers, as: :json
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested v1_event" do
      v1_event = V1::Event.create! valid_attributes
      expect {
        delete v1_event_url(v1_event), headers: valid_headers, as: :json
      }.to change(V1::Event, :count).by(-1)
    end
  end

  describe "POST /join" do
    let(:public_event_attributes) { FactoryBot.build(:valid_public_event).attributes }
    it "adds a new user with valid attributes to public event" do
      v1_event = V1::Event.create! public_event_attributes
      expect {
        post "/v1/events/#{v1_event.id}/join", headers: valid_headers, as: :json
      }.to change(v1_event.participants, :count).by(1)
      expect(response).to have_http_status(:ok)
      expect(response_body['message']).to eq('User successfully added to public event.')
    end
    it "adds a new user with valid attributes to private event" do
      invite = FactoryBot.create(:invite, :valid_invite)
      event = invite.event
      invite_token = invite.invite_token
      expect {
        post "/v1/events/#{event.id}/join?invite_token=#{invite_token}", headers: valid_headers, as: :json
      }.to change(event.participants, :count).by(1)
      expect(response).to have_http_status(:ok)
      expect(response_body['message']).to eq('User successfully added to private event.')
    end
    it "adds a new user with valid attributes to private event and decrements limit" do
      invite = FactoryBot.create(:invite, :valid_invite)
      event = invite.event
      invite_token = invite.invite_token
      limit = invite.limit
      post "/v1/events/#{event.id}/join?invite_token=#{invite_token}", headers: valid_headers, as: :json
      invite.reload
      expect(invite.limit).to eq(limit-1)
    end
    it 'fails to add a user with invalid token to event' do
      v1_event = V1::Event.create! valid_attributes
      post "/v1/events/#{v1_event.id}/join?invite_token=invalidtoken", headers: valid_headers, as: :json
      expect(response_body['message']).to eq('Wrong invite token for event.')
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "POST /leave" do
    it "successfully removes current user from an event which its a part of" do
      v1_event = V1::Event.create! valid_attributes
      post "/v1/events/#{v1_event.id}/leave", headers: valid_headers, as: :json
      expect(response_body['message']).to eq('User successfully deleted from event.')
      expect(response).to have_http_status(:ok)
    end
  end
end
