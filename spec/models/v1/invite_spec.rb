require 'rails_helper'

RSpec.describe V1::Invite, type: :model do
    subject {
        FactoryBot.create(:invite, :valid_invite)
    }
    it 'should be a valid invite with attributes' do
        expect(subject).to be_valid
    end
    it 'should have a unique event_id' do
        dup_invite = subject.dup
        dup_invite.save
        expect(dup_invite.errors[:event_id]).to include('has already been taken')
    end
    it 'should have limit set' do
        subject.limit = nil
        expect(subject).to_not be_valid
    end
    it 'should have a generated token' do
        expect(subject.invite_token).to_not be_nil
    end
end
