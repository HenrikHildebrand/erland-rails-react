require 'rails_helper'

RSpec.describe V1::Event, type: :model do
    subject {
        FactoryBot.create(:valid_not_public_event)
    }
    it 'should be valid with valid attributes' do
        expect(subject).to be_valid
    end
    it 'title should be present' do
        subject.title = nil
        expect(subject).to_not be_valid
    end
    it 'admin should be present' do
        subject.admin_id = nil
        expect(subject).to_not be_valid
    end
    it 'date should be present and valid' do
        subject.date = nil
        expect(subject).to_not be_valid
    end
    it 'date should be > today' do
        subject.date = Date.yesterday
        expect(subject).to_not be_valid
    end
    it 'public should be present' do
        subject.is_public = nil
        expect(subject).to_not be_valid
    end
    it 'invite_only should be present' do
        subject.invite_only = nil
        expect(subject).to_not be_valid
    end
end
