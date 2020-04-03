FactoryBot.define do
    factory :event do
        trait :valid_event do
            title { Faker::Name.first_name + " event" }
            date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
            association :admin, factory: [:user, :valid_user], strategy: :create
            public { true }
            invite_only { true }
            initial_credits { 10 }
        end
        trait :invalid_event do
            title { "as" }
        end
    end
end