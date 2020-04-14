FactoryBot.define do
    factory :wallet do
        trait :valid_wallet do
            association :event, factory: [:valid_not_public_event], strategy: :create
            credits { Faker::Number.between(from: 1, to: 10) }
            association :user, factory: [:user, :valid_user], strategy: :create
        end
        trait :invalid_wallet do
          credits { -1 }
        end
    end
end