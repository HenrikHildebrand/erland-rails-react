FactoryBot.define do
    factory :invite do
        trait :valid_invite do
            association :event, factory: [:event, :valid_event], strategy: :create
            limit { Faker::Number.between(from: 1, to: 10) }
            expire_at { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
        end
        trait :invalid_invite do
            limit { -1 }
            expire_at { Faker::Date.between(from: Date.today-10.days, to: Date.today-1.days) }    
        end
    end
end