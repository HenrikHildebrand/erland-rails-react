require 'rails_helper'

RSpec.describe V1::Alternative, type: :model do
  let(:question) { FactoryBot.create(:question_with_alternatives) }
  let(:user) { FactoryBot.create(:user, :valid_user) }

  subject {
    V1::Alternative.new(
      title: "This is an alternative",
      correct: true,
      question_id: question.id)
  }
  it 'should be valid' do
    expect(subject).to be_valid
  end
  it 'an alternative can only have one correct answer' do
    subject.save
    dup_alt = subject.dup
    dup_alt.save
    expect(dup_alt).not_to be_valid
  end
end
