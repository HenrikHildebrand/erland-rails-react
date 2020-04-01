# require 'rails_helper'

# RSpec.describe V1::EventsController do
#     let!(:valid_attributes) { { title: 'Test event', date: Date.tomorrow, admin_id: 1 } }
#     let!(:invalid_attributes) { { date: Date.tomorrow, admin_id: 1 } }

#     let!(:events) { FactoryBot.create_list(:event, 5) }
#     let!(:event_id) { events.first.id }

#     let!(:users) { FactoryBot.create_list(:user, 5) }

#     # -- EVENTS GET ALL EVENTS --
#     describe "GET #index" do
#         context 'when the request is valid' do
#             before do
#                 get "/v1/events", headers: @headers
#             end
#             it "should return status code 200" do
#                 expect(response).to have_http_status(:ok)
#             end
#             it "returns all events available" do
#                 expect(response_body['all_events'].size).to eq(5)
#             end
#         end
#     end
#     # -- EVENTS GET SPECIFIC EVENT --
#     describe "GET #show" do
#         context 'when request a specific event that exists' do
#             before do
#                 get "/v1/events/#{event_id}", headers: @headers
#             end
#             it 'should return all correct fields' do
#                 expect(response_body['event']['title']).to eq(events.first.title)
#             end
#             it 'should return all participants' do
#             end
#             it 'should return all collaborators' do
#             end
#         end
#         context 'when request a specific event does not exist' do
#             before do
#                 get "/v1/events/9991991991", headers: @headers
#             end
#             it 'should raise an error' do
#                 expect(response).to have_http_status(:bad_request)
#             end
#         end
#     end

#     # -- EVENTS CREATE TEST CASES --
#     describe "POST #create" do
#         context 'when the request is valid' do 
#             before do
#                 post "/v1/events", params: {event: valid_attributes}, headers: @headers
#             end 
#             it "returns data of specific event" do
#                 expect(response).to have_http_status(:ok)
#                 expect(response_body['event']['title']).to eq(valid_attributes[:title])
#             end
#         end
#         context 'when the request is invalid' do
#             before do
#                 post "/v1/events", params: {event: invalid_attributes}, headers: @headers
#             end 
#             it "returns data of specific event" do
#                 expect(response).to have_http_status(:bad_request)
#             end 
#         end
#     end
# end