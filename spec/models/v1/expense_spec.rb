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

  it 'has a grand_total and is not less than 0' do
    subject.grand_total = nil
    expect(subject).to_not be_valid
    subject.grand_total = -100
    expect(subject).to_not be_valid
  end

  it 'if debtors no custom_debt must exist and vice versa' do
  end

  it 'has either debtors else split on all participants in event' do
  end
end
