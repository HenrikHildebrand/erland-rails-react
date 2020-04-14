require 'rails_helper'

RSpec.describe V1::Wallet, type: :model do
    subject {
        FactoryBot.create(:wallet, :valid_wallet)
    }
    it 'should be a valid invite with attributes' do
        expect(subject).to be_valid
    end
    it 'should have a unique user_id' do
        new_wallet = subject.dup
        new_wallet.save
        expect(new_wallet.errors[:user]).to include('has already been taken')
    end
    it 'should have credits set' do
        subject.credits = nil
        expect(subject).to_not be_valid
    end
    it 'should have a credit lq or eq to 0' do
        subject.credits = -1
        expect(subject).to_not be_valid
    end
end
