require 'rails_helper'

RSpec.describe V1::Event, type: :model do
    subject {
        FactoryBot.create(:event, :valid_event)
    }
    it 'title should be present' do
        subject.title = nil
        expect(subject).to_not be_valid
    end
end
