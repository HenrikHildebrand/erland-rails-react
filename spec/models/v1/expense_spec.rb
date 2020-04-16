require 'rails_helper'

RSpec.describe Expense, type: :model do
  subject {
    FactoryBot.create(:expense, :valid_expense)
  }
  it 'should be valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'has a creator' do
    subject.creator = nil
    expect(subject).to_not be_valid
  end

  it 'has a grand_total' do
  end

  it 'has only one creator' do
  end

  it 'has either custom_debt or equal percentage' do
  end

  it 'has either debtors else split on all participants in event' do
  end
end
