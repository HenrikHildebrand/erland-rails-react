FactoryBot.define do
    factory :event do
        trait :valid_event do
            title { Faker::Name.first_name + " event" }
            date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
            association :admin, factory: [:user, :valid_user], strategy: :create
            invite_only { true }
            initial_credits { 10 }
            free { true }
            description { "This is an event that will celebrate Erland" }
            location { "Gibraltargatan, 412 79 Göteborg" }
        end
        trait :invalid_event do
            title { "as" }
        end
        trait :public_event do
            is_public { true }
        end
        trait :not_public_event do
            is_public { false }
        end
    factory :valid_public_event, traits: [:valid_event, :public_event]
    factory :valid_not_public_event, traits: [:valid_event, :not_public_event]
    end
end