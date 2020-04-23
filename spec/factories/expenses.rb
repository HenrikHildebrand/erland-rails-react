FactoryBot.define do
  factory :expense do
    trait :valid_expense do
      association :event, factory: [:valid_not_public_event], strategy: :create
      grand_total { Faker::Number.between(from: 100, to: 10000) }
      association :creator, factory: [:user, :valid_user], strategy: :create
    end
    trait :invalid_wallet do
      grand_total { -1 }
    end
  end
end