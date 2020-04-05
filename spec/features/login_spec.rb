require 'rails_helper'

RSpec.describe 'Testing login functionality', type: :feature do
  before :each do
    @user = FactoryBot.create(:user, :valid_user)
  end
  scenario "the sign in process" do
    visit '/users/sign_in'
    fill_in 'user_email', with: @user.email
    fill_in 'user_password', with: @user.password
    click_button 'Log in'
    expect(page.status_code).to eq(200)
  end
end
