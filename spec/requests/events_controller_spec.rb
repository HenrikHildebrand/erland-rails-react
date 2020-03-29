require 'rails_helper'

RSpec.describe V1::EventsController do
    let!(:user) {User.create(email: 'test@test.com', password: "password", password_confirmation: "password")}
    let!(:valid_attributes) { { title: 'Test event', date: Date.tomorrow, admin_id: 1 } }
    let!(:invalid_attributes) { { date: Date.tomorrow, admin_id: 1 } }
    let!(:headers) { { "ACCEPT": "application/json" } }

    let!(:events) {FactoryBot.create_list(:event, 20)}

    before :each do
        sign_in user
    end

    # -- EVENTS GET TEST CASES --
    describe "GET #index" do
        context 'when the request is valid' do
            before do
                get "/v1/events", headers: headers
            end
            it "returns all evetns available" do
                puts JSON.parse(response.body)
                expect(response).to have_http_status(:ok)
            end
        end
    end

    # -- EVENTS CREATE TEST CASES --
    describe "POST #create" do
        context 'when the request is valid' do 
            before do
                post "/v1/events", params: {event: valid_attributes}, headers: headers
            end 
            it "returns data of specific event" do
                expect(response).to have_http_status(:ok)
                expect(JSON.parse(response.body)['event']['title']).to eq(valid_attributes[:title])
            end
        end
        context 'when the request is invalid' do
            before do
                post "/v1/events", params: {event: invalid_attributes}, headers: headers
            end 
            it "returns data of specific event" do
                expect(response).to have_http_status(:bad_request)
            end 
        end
    end
end