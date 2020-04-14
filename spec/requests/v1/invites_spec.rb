require 'rails_helper'

RSpec.describe "/v1/invites", type: :request do
  let(:valid_attributes) { FactoryBot.build(:invite, :valid_invite).attributes }
  let(:invalid_attributes) { FactoryBot.build(:invite, :invalid_invite).attributes }
  let(:valid_headers) {{ "ACCEPT": "application/json" }}

  describe "GET /index" do
    it "renders a successful response" do
      V1::Invite.create! valid_attributes
      get v1_invites_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      v1_invite = V1::Invite.create! valid_attributes
      get v1_invite_url(v1_invite), as: :json
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new V1::Invite" do
        expect {
          post v1_invites_url,
               params: valid_attributes, headers: valid_headers, as: :json
        }.to change(V1::Invite, :count).by(1)
      end
    end
      it "renders a JSON response with the new v1_invite" do
        post v1_invites_url,
             params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json; charset=utf-8"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new V1::Invite" do
        expect {
          post v1_invites_url,
               params: invalid_attributes, as: :json
        }.to change(V1::Invite, :count).by(0)
      end

      it "renders a JSON response with errors for the new v1_invite" do
        post v1_invites_url,
             params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

  describe "PATCH /update" do
    context "with valid parameters" do
      it "updates the requested v1_invite" do
        v1_invite = V1::Invite.create! valid_attributes
        patch v1_invite_url(v1_invite),
              params: valid_attributes, headers: valid_headers, as: :json
        v1_invite.reload
        expect(response).to have_http_status(:ok)
    end

      it "renders a JSON response with the v1_invite" do
        v1_invite = V1::Invite.create! valid_attributes
        patch v1_invite_url(v1_invite),
              params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the v1_invite" do
        v1_invite = V1::Invite.create! valid_attributes
        patch v1_invite_url(v1_invite),
              params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested v1_invite" do
      v1_invite = V1::Invite.create! valid_attributes
      expect {
        delete v1_invite_url(v1_invite), headers: valid_headers, as: :json
      }.to change(V1::Invite, :count).by(-1)
    end
  end
end
