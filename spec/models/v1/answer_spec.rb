require 'rails_helper'

RSpec.describe V1::Answer, type: :model do
  let(:question) { FactoryBot.create(:question_with_alternatives) }
  let(:user) { FactoryBot.create(:user, :valid_user) }

  subject {
    V1::Answer.new(
      user_id: user.id,
      alternative_id: question.alternatives.first.id)
  }
  it 'should be valid' do
    expect(subject).to be_valid
  end
  it 'user can only choose one alternative' do
    subject.save
    dup_answer = subject.dup
    dup_answer.save
    expect(dup_answer).not_to be_valid
  end
  it 'user can only answer once on a question' do
    subject.save
    dup_answer = subject.dup
    dup_answer.alternative_id = question.alternatives.second.id
    dup_answer.save
    expect(dup_answer).not_to be_valid
  end
end
