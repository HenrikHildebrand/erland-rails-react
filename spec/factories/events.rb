FactoryBot.define do
    factory :event do
        trait :valid_event do
            title { Faker::Name.first_name + " event" }
            date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
            association :admin, factory: [:user, :valid_user], strategy: :create
        end
        trait :invalid_event do 
            date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
            association :admin, factory: [:user, :invalid_user], strategy: :create
        end
        
    end
end