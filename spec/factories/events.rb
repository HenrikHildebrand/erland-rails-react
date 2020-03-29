FactoryBot.define do
    factory :event do
        title { Faker::Name.first_name + " event" }
        date { Faker::Date.between(from: Date.today, to: 1.year.from_now) }
        admin_id { 1 }
    end
end